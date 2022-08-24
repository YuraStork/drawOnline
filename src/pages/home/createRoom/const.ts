import { Socket } from "socket.io-client";
import * as yup from "yup";
import { CreateRoom } from "../types";

const initialValues = {
  roomName: "",
  roomPassword: "",
};
const validationSchema = yup.object().shape({
  roomName: yup.string().required("Required"),
});

const onSubmit = async (
  data: CreateRoom,
  setIsLoading: (arg: boolean) => void,
  socket: Socket<any, any>
) => {
  setIsLoading(true);
  socket.emit("CREATE", data);
  socket.emit("GET_USER_ROOMS", { userId: data.userId });
  setIsLoading(false);
};
export { initialValues, validationSchema, onSubmit };
