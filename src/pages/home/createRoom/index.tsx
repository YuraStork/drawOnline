import { useFormik } from "formik";
import { RoomWrapper } from "../styles";
import { initialValues, onSubmit, validationSchema } from "./const";
import { FC } from "react";
import { Loader } from "../../../components/loader";
import { useAppSelector } from "store/store";

type ComponentProps = {
  isLoading: boolean,
  setIsLoading: (arg: boolean) => void,
  socket: WebSocket | null
}

export const CreateRoomComponent: FC<ComponentProps> = ({ isLoading, setIsLoading, socket }) => {
  const user = useAppSelector(s => s.user.data);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data) => onSubmit({ ...data, userId: user.id, userName: user.name }, setIsLoading, socket),
  });

  if (isLoading) return <Loader position="absolute" />
  return (
    <RoomWrapper>
      <h3>Create room</h3>
      <form onSubmit={formik.handleSubmit}>
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
    </RoomWrapper>
  );
};
