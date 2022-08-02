import { useFormik } from "formik";
import { Form, FormWrapper, Title } from "../styles";
import { initialValues, validationSchema, onSubmit } from "./const";
import { Button } from "components/button/styles";
import { Input } from "components/input";

export const RegistrationComponent = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <FormWrapper>
      <Title>Registration</Title >
      <Form onSubmit={formik.handleSubmit}>
        <Input
          margin="5px 0px 0px 0px"
          label="Name"
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors.name && formik.touched.name ? formik.errors.name : ""
          }
        />

        <Input
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
          type="submit"
          width="100%"
          margin="10px 0px 0px 0px"
          color="#fff"
          disabled={!formik.isValid || !formik.dirty}
        >
          Send
        </Button>
      </Form>
    </FormWrapper>
  );
};
