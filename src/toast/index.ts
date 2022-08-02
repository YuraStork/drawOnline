import { toast } from "react-toastify";

export const toastError = (str: string) => toast.error(str, { hideProgressBar: true, autoClose: false });
export const toastSuccess = (str: string) => toast.success(str, { hideProgressBar: true, autoClose: false });
export const toastWarn = (str: string) => toast.warn(str, { hideProgressBar: true, autoClose: false });