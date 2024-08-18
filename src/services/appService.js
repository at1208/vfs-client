import { applicationURL } from "../utils/apiUrls";
import { constructURL } from "../utils/helpers";
import axiosInstance from "./axiosInstance";

export const createApplication = async (applicationData) => {
  try {
    const response = await axiosInstance.post(applicationURL, applicationData);
    return response.data;
  } catch (error) {
    return error.response?.errors || error.message;
  }
};

export const getApplications = async (queryParams = {}) => {
  try {
    const url = constructURL(applicationURL, queryParams);

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};
