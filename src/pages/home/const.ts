import { NavigateFunction } from "react-router-dom";
import { Socket } from "socket.io-client";
import { toastError } from "../../toast";
import { ActiveRoom } from "types/rooms";

export const GET_ROOMS = "GET_ROOMS";
export const CREATE_ERROR = "CREATE_ERROR";
export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const JOIN_SUCCESS = "JOIN_SUCCESS";
export const JOIN_ERROR = "JOIN_ERROR";
export const CASE_EXIT = "CASE_EXIT";
export const GET_USER_ROOMS = "GET_USER_ROOMS";

type Props = {
  setActiveRooms: (e: ActiveRoom[]) => void;
  navigate: NavigateFunction;
  socket: Socket<any, any>;
  setUserRooms: (e: ActiveRoom[]) => void;
};


export const SetRoomsConnection = (data: Props) => {
  const { socket, setActiveRooms, navigate, setUserRooms } = data;
  socket.emit(GET_ROOMS);
  socket.on(GET_ROOMS, (data: ActiveRoom[]) => setActiveRooms(data));
  socket.on(CREATE_SUCCESS, (id: string) => navigate(`/draw_online/${id}`));
  socket.on(CREATE_ERROR, (e: string) => toastError(e));
  socket.on(JOIN_SUCCESS, (id: string) => navigate(`/draw_online/${id}`));
  socket.on(JOIN_ERROR, (data: string) => toastError(data));
  socket.on(GET_USER_ROOMS, (data: ActiveRoom[]) => setUserRooms(data));
};

export const ClearRoomsConnection = (socket: Socket<any, any>) => {
  socket.off(GET_ROOMS);
  socket.off(CREATE_SUCCESS);
  socket.off(CREATE_ERROR);
  socket.off(JOIN_SUCCESS);
  socket.off(JOIN_ERROR);
  socket.off(GET_USER_ROOMS);
}