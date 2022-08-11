import { NavigateFunction } from "react-router-dom";
import { Socket } from "socket.io-client";
import { ActiveRoom } from "types/rooms";

export const GET_ROOMS = "GET_ROOMS";
export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const JOIN_SUCCESS = "JOIN_SUCCESS";
export const ERROR = "ERROR";;

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
  socket.on(CREATE_SUCCESS, (data: any) => {
    navigate(`/draw_online/${data.id}`);
  })
  socket.on(JOIN_SUCCESS, (data: any) => {
    navigate(`/draw_online/${data.roomId}`)
  })
  socket.on(ERROR, (data: string) => {
    navigate(`/draw_online/${data}`)
  })
};
