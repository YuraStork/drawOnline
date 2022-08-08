import { API } from "api/const";
import { Instance } from "api/instance";

export const logout = async () => {
  return Instance.delete(`${API}/user/logout`, { withCredentials: true });
}