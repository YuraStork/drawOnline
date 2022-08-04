import { useFormik } from "formik";
import { RoomWrapper } from "../styles";
import { initialValues, onSubmit, validationSchema } from "./const";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components/loader";
import { FC, useState } from "react";
import { useAppSelector } from "store/store";
import { LittleLoader } from "components/littleLoader";

type ComponentProps = {
  isLoading: boolean,
  setIsLoading: (arg: boolean) => void
}
export const EnterInRoomComponent: FC<ComponentProps> = () => {
  const navigate = useNavigate();
  const user = useAppSelector(s => s.user);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data, helper) => onSubmit({ ...data, userId: user.data.id, userName: user.data.name }, helper, navigate, setIsLoading)
  });

  return (
    <RoomWrapper>
      <h3>Enter in room</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="roomId"
            placeholder="Room id"
            value={formik.values.roomId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
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
            disabled={isLoading}
          />
          {formik.errors.roomPassword && formik.touched.roomPassword && (
            <div>{formik.errors.roomPassword}</div>
          )}
        </div>
        <button type="submit" disabled={isLoading}>Enter in room</button>
        {isLoading && <LittleLoader />}
      </form>
    </RoomWrapper>
  );
};
