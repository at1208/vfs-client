import { getSession } from "../../services/authService";

// Action Types
export const FETCH_SESSION_REQUEST = "FETCH_SESSION_REQUEST";
export const FETCH_SESSION_SUCCESS = "FETCH_SESSION_SUCCESS";
export const FETCH_SESSION_FAILURE = "FETCH_SESSION_FAILURE";

// Action Creators
export const fetchSessionRequest = () => ({
  type: FETCH_SESSION_REQUEST,
});

export const fetchSessionSuccess = (sessionData) => ({
  type: FETCH_SESSION_SUCCESS,
  payload: sessionData,
});

export const fetchSessionFailure = (error) => ({
  type: FETCH_SESSION_FAILURE,
  payload: error,
});

export const fetchSession = () => {
  return async (dispatch) => {
    dispatch(fetchSessionRequest());
    try {
      const data = await getSession(); // Use the API call function
      dispatch(fetchSessionSuccess(data));
    } catch (error) {
      dispatch(fetchSessionFailure(error.message));
    }
  };
};
