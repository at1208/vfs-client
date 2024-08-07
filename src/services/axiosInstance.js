import axios from "axios";
import { BASE_API } from "../environment";
import { HOME_PATH } from "../constants/path";

const axiosInstance = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
  withCredentials: true, // Ensure cookies are sent with each request
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = HOME_PATH;
      // Handle unauthorized errors
      return Promise.reject({ status: 401, message: "Unauthorized" });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
