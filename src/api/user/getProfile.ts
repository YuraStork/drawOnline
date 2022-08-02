import { API } from "api/const";
import { Instance } from "api/instance"
import { getToken } from "services/token.service";
import { AuthorizedUser } from "types";

export const getProfile = async (id: string) => {
  return Instance.get<AuthorizedUser | null>(`${API}/user/${id}`, { headers: { "Authorization": `Bearer ${getToken()}` } });
} 