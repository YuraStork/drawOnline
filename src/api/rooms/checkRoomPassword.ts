import { Instance } from "../instance";

export const checkRoomPassword = (id: string, password: string) => {
  return Instance.post(`room/checkRoomPassword/${id}`, { password }, { withCredentials: true });
}