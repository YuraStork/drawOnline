import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { getToken } from "services/token.service";
import { AuthorizedUser, SavedUserObject, UserLoginFormData, UserRegistrationData } from "types";
import { API } from "./const";


export const handleAuthorization = async (data: UserLoginFormData) => {
  try {
    const res = await axios.post<SavedUserObject>(`${API}/user/login`, data);
    return res;
  } catch (e: AxiosError | any) {
    toast.error(((e as AxiosError).response?.data as string) || "Error");
    return null;
  }
};

export const handleRegistration = async (data: UserRegistrationData) => {
  try {
    const res = await axios.post(`${API}/user/register`, data);
    return res;
  } catch (e) {
    toast.error(((e as AxiosError).response?.data as string) || "Error");
    return null;
  }
};

export const getUserProfile = async (id: string ) => {
  try {
    const res = await axios.get<AuthorizedUser | null>(`${API}/user/${id}`, { headers: { "Authorization": `Bearer ${getToken()}` } });
    return res;
  }
  catch (e) {
    toast.error(((e as AxiosError).response?.data as string) || "Error");
    return null;
  }
};

export const updateUserProfile = async (data: any) => {
  try {
    const res = await axios.put(`${API}/user/update`, data, { headers: { "Authorization": `Bearer ${getToken()}` } });
    console.log(res);
    return res;
  }
  catch (e) {
    toast.error("Помилка");
    return null;
  }
}
