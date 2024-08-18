import { visaURL } from "../utils/apiUrls";
import { constructURL } from "../utils/helpers";
import axiosInstance from "./axiosInstance";

export const getVisas = async (queryParams = {}) => {
  try {
    const url = constructURL(visaURL, queryParams);

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};
