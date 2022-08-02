import axios, { AxiosError } from "axios";
import { toastError } from "../toast";

export const Instance = axios.create({ baseURL: "http://localhost:5000/api/" });

Instance.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error: AxiosError) {
    if (error.response?.status === 500) {
      window.location.replace("/server-error");
      return Promise.reject(error);
    }
    
    toastError((error.response?.data as any)?.message || "Server Error");
    return Promise.reject(error);
  }
);
