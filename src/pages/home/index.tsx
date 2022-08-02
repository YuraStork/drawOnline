import { Container } from "components/container/styles"
import { useEffect, useState } from "react"
import { getAllRooms } from "../../api/rooms/getRooms"

import { Loader } from "../../components/loader"
import { useRequest } from "../../hooks/useRequest.hook"
import { CreateRoomComponent } from "./createRoom"
import { EnterInRoomComponent } from "./enterInRoom"
import { HomePageSection, HomePageWrapper, ActiveRoomsWrapper, ChatWrapper, Wrapper } from "./styles"

export const HomePage = () => {
  const [loading, setIsLoading] = useState(false);
 
  if (loading) return <Loader position="absolute" />

  return <HomePageSection>
    <Container>
      <HomePageWrapper>
        <ActiveRoomsWrapper>
          <h3>Active rooms</h3>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </ActiveRoomsWrapper>
        <Wrapper>
          <CreateRoomComponent isLoading={loading} setIsLoading={setIsLoading} />
          <EnterInRoomComponent isLoading={loading} setIsLoading={setIsLoading} />
        </Wrapper>
        <ChatWrapper>
          <h3>Chat</h3>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </ChatWrapper>
      </HomePageWrapper>
    </Container>
  </HomePageSection>
}