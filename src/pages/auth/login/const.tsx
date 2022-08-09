import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "store/store";
import { UserLoginThunk } from "store/thunks/user_authorization_thunks/index";
import { UserLoginFormData } from "types";
import { cryptoSha256 } from "utils/cryptoPassord";
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  email: yup.string().email("Not valid email").required("Required"),
  password: yup.string().min(6, "min 6").required("Required"),
});

export const initialValues: UserLoginFormData = {
  email: "",
  password: "",
};

export const AuthorizationFileds = ["email", "password"];

export const onSubmit = async (
  data: UserLoginFormData,
  dispatch: AppDispatch,
) => {
  const password = cryptoSha256(data.password);
  await dispatch(UserLoginThunk({ ...data, password }))
};
