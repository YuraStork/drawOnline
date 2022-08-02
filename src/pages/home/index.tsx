import { Container } from "components/container/styles"
import { useEffect, useState } from "react"
import { getAllRooms } from "../../api/rooms/getRooms"

import { Loader } from "../../components/loader"
import { useRequest } from "../../hooks/useRequest.hook"
import { CreateRoomComponent } from "./createRoom"
import { EnterInRoomComponent } from "./enterInRoom"
import { HomePageSection, HomePageWrapper } from "./styles"

export const HomePage = () => {
  const [loading, setIsLoading] = useState(false);
  const { data, isLoading, makeRequest } = useRequest(getAllRooms);

  useEffect(() => {
    if (!data) {
      makeRequest();
    }
  }, [])

  if (isLoading || loading) return <Loader position="absolute" />

  return <HomePageSection>
    <Container>
      <HomePageWrapper>
        <CreateRoomComponent isLoading={loading} setIsLoading={setIsLoading} />
        <EnterInRoomComponent isLoading={loading} setIsLoading={setIsLoading} />
      </HomePageWrapper>
    </Container>
  </HomePageSection>
}