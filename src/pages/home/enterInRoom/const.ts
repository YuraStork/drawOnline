import { Socket } from "socket.io-client";
import * as yup from "yup";
import { EnterInRoomType } from "../types";

const initialValues = {
  roomId: "",
  roomPassword: "",
};
const validationSchema = yup.object().shape({
  roomId: yup.string().required("Required"),
});

const onSubmit = async (
  data: EnterInRoomType,
  socket: Socket<any, any>,
  setIsLoading: (arg: boolean) => void
) => {
  setIsLoading(true);
  socket.emit("JOIN", data);
  setIsLoading(false);
};

export { initialValues, onSubmit, validationSchema };
