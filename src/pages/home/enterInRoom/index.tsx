import { useFormik } from "formik";
import { EnterInRoomWrapper } from "./styles";
import { initialValues, onSubmit, validationSchema } from "./const";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components/loader";
import { FC, useState } from "react";

type ComponentProps = {
  isLoading: boolean,
  setIsLoading: (arg: boolean) => void
}
export const EnterInRoomComponent: FC<ComponentProps> = ({ setIsLoading, isLoading }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data, helper) => onSubmit(data, helper, navigate, setIsLoading)
  });
  if (isLoading) return <Loader position="absolute" />
  return (
    <EnterInRoomWrapper>
      <h3>Enter in room</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <div>{formik.errors.name}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            name="roomId"
            placeholder="Room id"
            value={formik.values.roomId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.roomId && formik.touched.roomId && (
            <div>{formik.errors.roomId}</div>
          )}
        </div>
        <div>
          <input
            type="password"
            name="roomPassword"
            placeholder="Room password"
            value={formik.values.roomPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.roomPassword && formik.touched.roomPassword && (
            <div>{formik.errors.roomPassword}</div>
          )}
        </div>
        <button type="submit">Enter in room</button>
      </form>
    </EnterInRoomWrapper>
  );
};
