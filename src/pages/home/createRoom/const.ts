import * as yup from "yup";
import { CreateRoom } from "../types";

const initialValues = {
  roomName: "",
  roomPassword: "",
};
const validationSchema = yup.object().shape({
  roomName: yup.string().required("Required"),
  roomPassword: yup.string().required("Required"),
});

const onSubmit = async (
  data: CreateRoom,
  setIsLoading: (arg: boolean) => void,
  socket: WebSocket | null
) => {
  if (socket) {
    setIsLoading(true);
    socket.send(JSON.stringify({
      method: "CREATE",
      data
    }))
    setIsLoading(false);
  }
};
export { initialValues, validationSchema, onSubmit };
