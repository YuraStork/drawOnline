import { FC, useCallback, useState } from "react";
import { Socket } from "socket.io-client";
import { ActiveRoom } from "types/rooms";
import { RoomCard, CardSettings } from "./styles";
import { UpdateCard } from "./update";

type Props = {
  room: ActiveRoom;
  socket: Socket<any, any>;
  userId: string;
};

export const UserRoomCard: FC<Props> = ({ room, socket, userId }) => {
  const [active, setActive] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleDeleteRoom = useCallback(() => {
    socket.emit("DELETE_USER_ROOM", {
      userId,
      roomId: room._id,
      roomPassword: room.roomPassword,
    });
  }, [room]);

  return (
    <RoomCard active={active}>
      <h4>id {room._id}</h4>
      <p>
        name: {room.roomName}
        <br />
        show: {String(room.isShow)}
        <br />
        limit: {room.limit}
        <br />
        status: {String(room.status)}
      </p>
      {active && (
        <CardSettings>
          <li onClick={() => setEditMode(!editMode)}>edit</li>
          <li onClick={() => handleDeleteRoom()}>delete</li>
        </CardSettings>
      )}
      <span onClick={() => setActive(!active)}>
        {!active ? (
          <img src="/assets/dots.png" alt="edit" width={30} height={30} />
        ) : (
          <img src="/assets/close.png" alt="close" width={25} height={25} />
        )}
      </span>

      {editMode && (
        <UpdateCard
          socket={socket}
          room={room}
          userId={userId}
          setEditMode={setEditMode}
        />
      )}
    </RoomCard>
  );
};
