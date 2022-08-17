import { toastError } from "./../toast/index";
import { API, SetHeaders } from "api/const";
import axios, { AxiosError } from "axios";
import { getToken, saveUserInStorage } from "services/token.service";

export const Instance = axios.create({ baseURL: "http://localhost:5000/api/" });

Instance.interceptors.response.use(
  function (config) {
    return config;
  },
  async function (error: AxiosError) {
    if (error.code === "ERR_NETWORK" || error.response?.status === 500) {
      toastError("NETWORK ERROR")
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      try {
        const token = getToken();
        if (token) {
          const refresh = await axios.get(`${API}/user/refresh`, { withCredentials: true, ...SetHeaders() });
          saveUserInStorage(refresh.data);
          error.config.headers!["authorization"] = `Bearer ${refresh.data.token}`;
          return Instance.request(error.config);
        }
      } catch (e) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
