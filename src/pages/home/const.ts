import { NavigateFunction } from "react-router-dom";
import { Socket } from "socket.io-client";
import { ActiveRoom } from "types/rooms";

export const GET_ROOMS = "GET_ROOMS";
export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const JOIN_SUCCESS = "JOIN_SUCCESS";
export const JOIN_ERROR = "JOIN_ERROR";
export const CASE_EXIT = "CASE_EXIT";

type Props = {
  setActiveRooms: (e: ActiveRoom[]) => void;
  navigate: NavigateFunction;
  socket: Socket<any, any>;
};

export const SetRoomsConnection = (data: Props) => {
  const { socket, setActiveRooms, navigate } = data;

  socket.emit(GET_ROOMS);
  socket.on(GET_ROOMS, (data: ActiveRoom[]) => {
    setActiveRooms(data);
  })
  socket.on(CREATE_SUCCESS, (id: string) => {
    navigate(`/draw_online/${id}`);
  })
  socket.on(JOIN_SUCCESS, (id: string) => {
    console.log("JOIN_SUCCESS")
    navigate(`/draw_online/${id}`)
  })
  socket.on(JOIN_ERROR, (data: string) => {
    console.error("ERROR IN HOME", data);
  })
};
