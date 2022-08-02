import { Instance } from "../instance";

export const checkRoom = (id: string) => {
  return Instance.get(`room/check/${id}`, { withCredentials: true });
}