import { FormikHelpers } from "formik";
import { NavigateFunction } from "react-router-dom";
import * as yup from "yup";
import { createRoom } from "../../../api/rooms/createRoom";
import { CreateRoom } from "../types";

const initialValues = {
  name: "",
  roomName: "",
  roomPassword: ""
}
const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  roomName: yup.string().required('Required'),
  roomPassword: yup.string().required('Required')
})

const onSubmit = async (data: CreateRoom, helper: FormikHelpers<CreateRoom>, navigate: NavigateFunction, setIsLoading: (arg: boolean) => void) => {
  try {
    setIsLoading(true);
    const res = await createRoom(data);
    navigate(`/draw_online/${res.data._id}`)
  } catch (e) {
    console.error(e);
  } finally {
    setIsLoading(false);
  }

}
export { initialValues, validationSchema, onSubmit }