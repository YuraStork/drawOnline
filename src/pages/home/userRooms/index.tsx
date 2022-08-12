import { FC, useEffect } from "react";
import { Socket } from "socket.io-client";
import { useAppSelector } from "store/store";
import { toastError } from "../../../toast";
import { ActiveRoom } from "types/rooms";
import { UserRoomCard } from "./card";
import { UserCardsWrapper, UserRoomsWrapper } from "./styles";

type Props = {
  socket: Socket<any, any>;
  userRooms: ActiveRoom[]
};

export const UserRooms: FC<Props> = ({ socket, userRooms }) => {
  const { id } = useAppSelector((s) => s.user.data);

  useEffect(() => {
    socket.emit("GET_USER_ROOMS", { userId: id });
    socket.on("DELETE_ERROR", (error: string) => {
      toastError(error)
    });
  }, []);

  return (
    <UserRoomsWrapper>
      <h3>Your Rooms</h3>
      <UserCardsWrapper>
        {userRooms.map((room) => <UserRoomCard key={room._id} room={room} socket={socket} />)}
      </UserCardsWrapper>
    </UserRoomsWrapper>
  );
};
