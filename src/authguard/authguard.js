import { fetchSessionSuccess } from "../redux/actions/sessionAction";
import store from "../redux/store/store";
import { getSession } from "../services/authService";
import { HOME_PATH } from "../constants/path";

export default function authguard(path) {
  return new Promise(async (resolve, reject) => {
    try {
      const state = store.getState();
      const session = state.session?.session;

      if (!session) {
        console.log("No session found in Redux store.");
        try {
          const result = await getSession();
          if (result && result.status === 401) {
            console.log("Unauthorized response, redirecting to home.");
            window.location.href = HOME_PATH; // Redirect to login if 401
            reject(result.message);
          } else if (result) {
            console.log("Session fetched successfully, updating Redux store.");
            store.dispatch(fetchSessionSuccess(result));
            resolve(path);
          }
        } catch (error) {
          console.error("Error during session fetch:", error);
          reject(error);
        }
      } else {
        console.log("Session found in Redux store, resolving path.");
        resolve(path);
      }
    } catch (error) {
      console.error("Authguard error:", error);
      reject(error);
    }
  });
}
