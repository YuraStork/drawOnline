import { FC } from "react";
import { Socket } from "socket.io-client";
import { ActiveRoom } from "types/rooms";
import { UserRoomCard } from "./card";
import { UserCardsWrapper, UserRoomsWrapper } from "./styles";

type Props = {
  socket: Socket<any, any>;
  userRooms: ActiveRoom[];
  userId: string;
  userName: string;
};

export const UserRooms: FC<Props> = ({ socket, userRooms, userId, userName }) => {
  return (
    <UserRoomsWrapper>
      <h3>Your Rooms</h3>
      <UserCardsWrapper>
        {userRooms.map((room) => (
          <UserRoomCard
            userName={userName}
            key={room._id}
            room={room}
            socket={socket}
            userId={userId}
          />
        ))}
      </UserCardsWrapper>
    </UserRoomsWrapper>
  );
};
