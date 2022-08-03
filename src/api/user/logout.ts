import { Instance } from "api/instance"

export const logout = async () => {
  return Instance.delete("/logout", { withCredentials: true });
}