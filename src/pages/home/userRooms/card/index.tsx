import { FC, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { useAppSelector } from "store/store";
import { ActiveRoom } from "types/rooms";
import { Portal } from "utils/portal";
import { RoomCard, CardSettings } from "./styles";
import { UpdateCard } from "./update";

type Props = {
  room: ActiveRoom;
  socket: Socket<any, any>;
};

export const UserRoomCard: FC<Props> = ({ room, socket }) => {
  const [active, setActive] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { id } = useAppSelector((s) => s.user.data);
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteRef = useRef<HTMLInputElement>(null!);

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
          <li onClick={() => setDeleteModal(true)}>delete</li>
        </CardSettings>
      )}
      <span onClick={() => setActive(!active)}>
        {!active ? (
          <img src="/assets/dots.png" alt="edit" width={30} height={30} />
        ) : (
          <img src="/assets/close.png" alt="close" width={25} height={25} />
        )}
      </span>

      {deleteModal && (
        <Portal>
          {" "}
          <label htmlFor="password"></label>
          <input id="password" type="text" ref={deleteRef} />
          <button
            onClick={() => {
              socket.emit("DELETE_USER_ROOM", {
                userId: id,
                roomId: room._id,
                roomPassword: deleteRef.current.value,
              });
              setDeleteModal(false);
            }}
          >
            send
          </button>{" "}
        </Portal>
      )}

      {editMode && (
        <UpdateCard
          socket={socket}
          room={room}
          userId={id}
          setEditMode={setEditMode}
        />
      )}
    </RoomCard>
  );
};
