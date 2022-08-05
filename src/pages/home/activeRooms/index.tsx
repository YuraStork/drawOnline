import { FC } from "react";
import styled from "styled-components";
import { ActiveRoom } from "types/rooms";

const Room = styled.div`
  color: #fff;
  padding: 10px 10px 10px 20px;
  border: 2px solid #fff;
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
  activeRooms: ActiveRoom[]
}

export const ActiveRooms: FC<ActiveRoomsProps> = ({ activeRooms }) => {
  return (
    <>
      {activeRooms ? (
        activeRooms.map((room) => <Room key={room._id}><div /> {room.roomName}</Room>)
      ) : (
        <p>no active rooms</p>
      )}
    </>
  );
};
