import { getToken } from "services/token.service";

export const API = "http://localhost:5000/api";

export const SetHeaders = () => ({
  headers: { authorization: `Bearer ${getToken()}` },
});
