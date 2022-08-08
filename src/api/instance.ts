import { API, SetHeaders } from "api/const";
import axios, { AxiosError } from "axios";
import { getToken, saveUserInStorage } from "services/token.service";

export const Instance = axios.create({ baseURL: "http://localhost:5000/api/" });

Instance.interceptors.response.use(
  function (config) {
    return config;
  },
  async function (error: AxiosError) {
    if (error.response?.status === 500) {
      window.location.replace("/server-error");
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      try {
        const token = getToken();
        if (token) {
          const refresh = await axios.get(`${API}/user/refresh`, { withCredentials: true, ...SetHeaders() });
          saveUserInStorage(refresh.data);
          console.log(history);
          window.location.replace("/")
        }
      } catch (e) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
