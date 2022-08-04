import { NavigateFunction } from "react-router-dom";
import { FormikHelpers } from "formik";
import * as yup from "yup";
import { EnterInRoomType } from "../types";
import { enterInRoom } from "../../../api/rooms/enterInRoom";

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
  helper: FormikHelpers<Omit<EnterInRoomType, "userId" | "userName">>,
  navigate: NavigateFunction,
  setIsLoading: (arg: boolean) => void
) => {
  try {
    setIsLoading(true)
    const res = await enterInRoom(data);
    if (res.status === 200) {
      navigate(`/draw_online/${res.data._id}`, { state: { userName: data.userName } })
    }
  } catch (e) {
    console.error(e);
  }
  finally {
    setIsLoading(false)
  }

};

export { initialValues, onSubmit, validationSchema }