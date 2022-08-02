import { useFormik } from "formik";
import { Form, FormWrapper, Title } from "../styles";
import { initialValues, validationSchema, onSubmit } from "./const";
import { useNavigate } from "react-router-dom";
import { Button } from "components/button/styles";
import { Portal } from "utils/portal";
import { Loader } from "components/loader";
import { Input } from "components/input";
import { useAppDispatch, useAppSelector } from "store/store";
import { getUser } from "store/selectors/user.selector";

export const LoginComponent = () => {
  const { isLoading } = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data: any, helper: any) => onSubmit(data, helper, dispatch, navigate),
  });

  return (<>
    <FormWrapper>
      <Title>Login</Title>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          disabled={isLoading}
          margin="5px 0px 0px 0px"
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ""
          }
        />
        <Input
          disabled={isLoading}
          margin="5px 0px 0px 0px"
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors.password && formik.touched.password
              ? formik.errors.password
              : ""
          }
        />
        <Button
          width="100%"
          type="submit"
          margin="10px 0px 0px 0px"
          color="#fff"
          disabled={!formik.isValid || !formik.dirty || isLoading}
        >
          Send
        </Button>
      </Form>
    </FormWrapper>

    {isLoading && <Portal><Loader /></Portal>}
  </>
  );
};
