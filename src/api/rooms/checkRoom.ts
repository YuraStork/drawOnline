import { API } from "api/const";
import axios from "axios";

export const checkRoom = (id: string, userId: string) => {
  return axios.post(`${API}/room/check/${id}`, {userId}, { withCredentials: true });
}