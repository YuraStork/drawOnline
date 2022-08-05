import { FormikHelpers } from "formik";
import { NavigateFunction } from "react-router-dom";
import * as yup from "yup";
import { createRoom } from "../../../api/rooms/createRoom";
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
  helper: FormikHelpers<Omit<CreateRoom, "userName" | "userId">>,
  navigate: NavigateFunction,
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
