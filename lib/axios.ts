import axios, { AxiosRequestConfig } from "axios";

export const fetchAPIAxios = async (
  url: string,
  options?: AxiosRequestConfig
) => {
  try {
    const response = await axios(url, options);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
