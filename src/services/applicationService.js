import { applicationURL } from "../utils/apiUrls";
import axiosInstance from "./axiosInstance";

export const createApplication = async (applicationData) => {
  try {
    const response = await axiosInstance.post(applicationURL, applicationData);
    return response.data;
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};

export const getApplications = async () => {
  try {
    const response = await axiosInstance.get(applicationURL);
    return response.data;
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};
