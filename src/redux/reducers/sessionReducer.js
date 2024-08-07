import {
  FETCH_SESSION_REQUEST,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE,
} from "../actions/sessionAction.js";

const initialState = {
  loading: false,
  session: null,
  error: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        session: action.payload,
        error: null,
      };
    case FETCH_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
