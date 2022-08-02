import axios from "axios"
import { Instance } from "../instance";

export const setUser = () => {
  return Instance.get("/user/set", { withCredentials: true });
} 