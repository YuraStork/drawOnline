import { WsContext } from "context/ws.context";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserInRoom } from "types";

const RoomUsersBlock = styled.div`
  grid-area: roomUsers;
  box-shadow: 0px 2px 5px 0px #b7bebe;

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
    socket.emit("GET_ROOM", roomId);
    socket.on("GET_ROOM", (data: any) => {
      setUsers(data.users);
    });
  }, []);

  return (
    <RoomUsersBlock>
      {(users.length > 0 ? users : []).map((user) => (
        <div key={user.userId}>{user.userName}</div>
      ))}
    </RoomUsersBlock>
  );
};
