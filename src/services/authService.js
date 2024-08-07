import axiosInstance from "./axiosInstance";
import { logoutURL, sessionURL } from "../utils/apiUrls.js";

export const getSession = async () => {
  try {
    const response = await axiosInstance.get(sessionURL);
    return response.data;
  } catch (error) {
    if (error.status === 401) {
      return { status: 401, message: "Unauthorized" };
    } else {
      console.error(
        "Error getting session:",
        error.response?.data || error.message
      );
      throw new Error(
        `Error getting session: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get(logoutURL);
    return response.data;
  } catch (error) {
    throw new Error(`${error.response?.data?.message || error.message}`);
  }
};
