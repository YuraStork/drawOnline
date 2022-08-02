import { NavigateFunction } from "react-router-dom";
import { FormikHelpers } from "formik";
import * as yup from "yup";
import { EnterInRoomType } from "../types";
import { enterInRoom } from "../../../api/rooms/enterInRoom";

const initialValues = {
  name: "",
  roomId: "",
  roomPassword: "",
};
const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  roomId: yup.string().required("Required"),
  roomPassword: yup.string()
});

const onSubmit = async (
  data: EnterInRoomType,
  helper: FormikHelpers<EnterInRoomType>,
  navigate: NavigateFunction,
  setIsLoading: (arg: boolean) => void
) => {
  try {
    setIsLoading(true)
    const res = await enterInRoom(data);
    navigate(`/draw_online/${res.data._id}`, { state: { userName: data.name } })
  } catch (e) {
    console.error(e);
  }
  finally {
    setIsLoading(false)
  }

};

export { initialValues, onSubmit, validationSchema }