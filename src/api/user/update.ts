import { API } from "api/const";
import { Instance } from "api/instance"
import { getToken } from "services/token.service";

export const updateUser = async (data: any) => {
  return Instance.put(`${API}/user/update`, data, { headers: { "Authorization": `Bearer ${getToken()}` } });;
} 