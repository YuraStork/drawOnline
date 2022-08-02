import { API } from "api/const";
import { Instance } from "api/instance"
import { UserRegistrationData } from "types";

export const registrationUser = async (data: UserRegistrationData) => {
  return Instance.post(`${API}/user/registration`, data);
} 