import { FC } from "react";
import styled from "styled-components";
import { ActiveRoom } from "types/rooms";

const Room = styled.div`
  color: #000000;
  padding: 10px 10px 10px 20px;
  border: 2px solid #000000;
  text-align: center;
  margin-top: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  & > div{
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    background-color: green;
    border-radius: 50%;
  }
`;

type ActiveRoomsProps = {
  activeRooms: ActiveRoom[],
  userId: string;
}

export const ActiveRooms: FC<ActiveRoomsProps> = ({ activeRooms, userId }) => {
  console.log("ACTIVE ROOMS", activeRooms)
  return (
    <>
      {activeRooms ? (
        activeRooms.map((room) => <Room key={room._id}><div /> {room.roomName} {room.users.length} / {room.limit} {room.owner === userId && "(your)"}</Room>)
      ) : (
        <p>no active rooms</p>
      )}
    </>
  );
};
