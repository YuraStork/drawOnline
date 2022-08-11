import { Button } from "components/button/styles";
import { Loader } from "components/loader";
import { WsContext } from "context/ws.context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/store";
import { UserLogoutThunk } from "store/thunks/user_authorization_thunks/index";
import { ActiveRoom } from "types/rooms";
import { ActiveRooms } from "./activeRooms";
import { Chat } from "./chat";
import { SetRoomsConnection } from "./const";
import { CreateRoomComponent } from "./createRoom";
import { EnterInRoomComponent } from "./enterInRoom";
import { HomeCabinet } from "./homeCabinet";
import {
  HomePageSection,
  HomePageWrapper,
  ActiveRoomsWrapper,
  ChatWrapper,
  Wrapper,
  HomeHeader,
} from "./styles";

export const HomePage = () => {
  const { id } = useAppSelector((s) => s.user.data);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const [activeRooms, setActiveRooms] = useState<ActiveRoom[]>([]);
  const { socket } = useContext(WsContext);
  const navigate = useNavigate();

  useEffect(() => {
    SetRoomsConnection({ navigate, setActiveRooms, socket })
  }, [])

  if (error) return <p>{error}</p>;
  if (loading) return <Loader position="absolute" />;

  return (
    <HomePageSection>
      <HomePageWrapper>
        <HomeHeader>
          <Button onClick={() => dispatch(UserLogoutThunk())}>logout</Button>
        </HomeHeader>
        <ActiveRoomsWrapper>
          <h3>Active rooms</h3>
          <ActiveRooms activeRooms={activeRooms} userId={id} />
        </ActiveRoomsWrapper>
        <Wrapper>
          <CreateRoomComponent
            isLoading={loading}
            setIsLoading={setIsLoading}
            socket={socket}
          />
          <EnterInRoomComponent
            socket={socket}
          />
          <HomeCabinet />
        </Wrapper>
        <ChatWrapper>
          <h3>Chat</h3>
          <Chat socket={socket} />
        </ChatWrapper>
      </HomePageWrapper>
    </HomePageSection>
  );
};
