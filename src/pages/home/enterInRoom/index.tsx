import { useFormik } from "formik";
import { RoomWrapper } from "../styles";
import { initialValues, onSubmit, validationSchema } from "./const";
import { FC, useState } from "react";
import { useAppSelector } from "store/store";
import { LittleLoader } from "components/littleLoader";
import { Socket } from "socket.io-client";

type ComponentProps = {
  socket: Socket<any, any>,
}
export const EnterInRoomComponent: FC<ComponentProps> = ({ socket }) => {
  const user = useAppSelector(s => s.user);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data) => onSubmit({ ...data, userId: user.data.id, userName: user.data.name }, socket, setIsLoading)
  });

  return (
    <RoomWrapper>
      <h3>Join to room</h3>
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
