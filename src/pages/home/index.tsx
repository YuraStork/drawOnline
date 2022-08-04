import { Loader } from "components/loader";
import { useState } from "react";
import { ActiveRooms } from "./activeRooms";
import { Chat } from "./chat";
import { CreateRoomComponent } from "./createRoom";
import { EnterInRoomComponent } from "./enterInRoom";
import { HomeCabinet } from "./homeCabinet";
import {
  HomePageSection,
  HomePageWrapper,
  ActiveRoomsWrapper,
  ChatWrapper,
  Wrapper,
} from "./styles";

export const HomePage = () => {
  const [loading, setIsLoading] = useState(false);
  if (loading) return <Loader position="absolute" />;

  return (
    <HomePageSection>
      <HomePageWrapper>
        <ActiveRoomsWrapper>
          <h3>Active rooms</h3>
          <ActiveRooms />
        </ActiveRoomsWrapper>
        <Wrapper>
          <CreateRoomComponent
            isLoading={loading}
            setIsLoading={setIsLoading}
          />
          <EnterInRoomComponent
            isLoading={loading}
            setIsLoading={setIsLoading}
          />
          <HomeCabinet />
        </Wrapper>
        <ChatWrapper>
          <h3>Chat</h3>
          <Chat />
        </ChatWrapper>
      </HomePageWrapper>
    </HomePageSection>
  );
};
