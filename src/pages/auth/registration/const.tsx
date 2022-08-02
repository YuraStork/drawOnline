import { FormikHelpers } from "formik";
import { toastSuccess } from "../../../toast";
import { UserRegistrationData } from "types";
import { cryptoSha256 } from "utils/cryptoPassord";
import * as yup from "yup";
import { AppDispatch } from "store/store";
import { NavigateFunction } from "react-router-dom";
import { UserRegistrationThunk } from "store/thunks/user.thunk";

export const validationSchema = yup.object().shape({
  name: yup.string().min(2, "min 2 symbols").required("Required"),
  email: yup.string().email("Not valid email").required("Required"),
  password: yup.string().min(6, "min 6").required("Required"),
});

export const initialValues: UserRegistrationData = {
  name: "",
  email: "",
  password: "",
};

export const onSubmit = (
  data: UserRegistrationData,
  formikHelper: FormikHelpers<UserRegistrationData>,
  dispatch: AppDispatch,
  navigate: NavigateFunction
): void => {
  const password = cryptoSha256(data.password);
  dispatch(UserRegistrationThunk({ ...data, password })).then(res => {
    formikHelper.resetForm();
    toastSuccess(res.payload.message);
  });
};
