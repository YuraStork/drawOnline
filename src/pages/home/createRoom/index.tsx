import { useFormik } from "formik";
import { CreateRoomWrapper } from "./styles";
import { initialValues, onSubmit, validationSchema } from "./const";
import { useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import { Loader } from "../../../components/loader";

type ComponentProps = {
  isLoading: boolean,
  setIsLoading: (arg: boolean) => void
}

export const CreateRoomComponent: FC<ComponentProps> = ({ isLoading, setIsLoading }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data, helper) => onSubmit(data, helper, navigate, setIsLoading),
  });
  if (isLoading) return <Loader position="absolute" />
  return (
    <CreateRoomWrapper>
      <h3>Create room</h3>
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
            name="roomName"
            placeholder="Room name"
            value={formik.values.roomName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.roomName && formik.touched.roomName && (
            <div>{formik.errors.roomName}</div>
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
        <button type="submit">Create room</button>
      </form>
    </CreateRoomWrapper>
  );
};
