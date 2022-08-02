import { getAllRooms } from "api/rooms/getRooms";
import { FC, useEffect } from "react";
import { RoomType } from "types";
import { useRequest } from "hooks/useRequest.hook";
import { LittleLoader } from "components/littleLoader";
import styled from "styled-components";

const Room = styled.div`
  color:#fff;
  padding: 10px 10px 10px 0;
  border: 2px solid #fff;
  text-align: center;
`
export const ActiveRooms = () => {
  const { data = [], error, isLoading, makeRequest } = useRequest(getAllRooms);

  useEffect(() => {
    makeRequest();
  }, []);

  if (error) return <p>{error}</p>;
  if (isLoading) return <LittleLoader />;

  return (
    <>
      {data?.length ? (
        data.map((room: RoomType) => <Room key={room._id}>{room._id}</Room>)
      ) : (
        <p>no active rooms</p>
      )}
    </>
  );
};
