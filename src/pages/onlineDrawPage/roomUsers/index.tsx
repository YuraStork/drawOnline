import { WsContext } from "context/ws.context";
import { GET_ROOM } from "pages/home/const";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserInRoom } from "types";

const RoomUsersBlock = styled.div`
  grid-area: roomUsers;
  padding: 5px;
  background-color: #fff;

  & > div {
    padding: 10px;
    border: 2px solid gray;
  }
`;

export const RoomUsers = () => {
  const { socket } = useContext(WsContext);
  const [users, setUsers] = useState<UserInRoom[]>([]);
  const { roomId } = useParams();

  useEffect(() => {
    socket.emit(GET_ROOM, roomId);
    socket.on(GET_ROOM, (data: any) => {
      setUsers(data.users);
    });
  }, []);

  return (
    <RoomUsersBlock>
      {users.length && users.map((user) => (
        <div key={user.userId}>{user.userName}</div>
      ))}
    </RoomUsersBlock>
  );
};
