import { handleRegistration } from "api/user.api";
import { FormikHelpers } from "formik";
import { UserRegistrationData } from "types";
import { cryptoSha256 } from "utils/cryptoPassord";
import * as yup from "yup";

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
): void => {
  const password = cryptoSha256(data.password);
  handleRegistration({ ...data, password });
  formikHelper.resetForm();
};
