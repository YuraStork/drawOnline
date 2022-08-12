import { useFormik } from "formik";
import { FC } from "react";
import { Socket } from "socket.io-client";
import { ActiveRoom } from "types/rooms";
import { Portal } from "utils/portal";

type Props = {
  socket: Socket<any, any>;
  room: ActiveRoom,
  setEditMode: (e: boolean) => void,
  userId: string
};
export const UpdateCard: FC<Props> = ({ socket, room, setEditMode, userId }) => {
  const formik = useFormik({
    initialValues: {
      roomName: room.roomName || "",
      isShow: !!room.isShow,
      roomPassword: "",
    },
    enableReinitialize: true,
    onSubmit: (data) => { socket.emit("UPDATE_USER_ROOM", { ...data, roomId: room._id, userId }); setEditMode(false) },
  });

  return (
    <Portal>
      <form onSubmit={formik.handleSubmit}>
        <input type="text" name="roomName" value={formik.values.roomName} onChange={formik.handleChange} placeholder="name" />
        <input type="text" name="roomPassword" value={formik.values.roomPassword} onChange={formik.handleChange} placeholder="password" />
        <input type="checkbox" name="isShow" checked={formik.values.isShow} onChange={formik.handleChange} />
        <button type="submit">save</button>
        <button onClick={() => setEditMode(false)}>cancel</button>
      </form>
    </Portal>
  );
};
