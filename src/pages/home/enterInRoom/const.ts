import * as yup from "yup";
import { EnterInRoomType } from "../types";

const initialValues = {
  roomId: "",
  roomPassword: "",
};
const validationSchema = yup.object().shape({
  roomId: yup.string().required("Required"),
  roomPassword: yup.string()
});

const onSubmit = async (
  data: EnterInRoomType,
  socket: WebSocket | null,
  setIsLoading: (arg: boolean) => void
) => {
  if (socket) {
    setIsLoading(true)
    socket.send(JSON.stringify({
      method: "JOIN",
      data
    }))
    setIsLoading(false)
  }
};

export { initialValues, onSubmit, validationSchema }