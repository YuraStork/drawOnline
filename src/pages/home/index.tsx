import { Loader } from "components/loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/store";
import { UserLogoutThunk } from "store/thunks/user.thunk";
import { ActiveRoom } from "types/rooms";
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
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [activeRooms, setActiveRooms] = useState<ActiveRoom[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) {
      const socket = new WebSocket("ws://localhost:5000/rooms");
      setSocket(socket);
      socket.onopen = () => {
        socket.send(JSON.stringify({
          method: "GETROOMS",
        }))
      }

      socket.onmessage = (e) => {
        const msg: any = JSON.parse(e.data);
        console.log(msg);

        switch (msg.method) {
          case "GETROOMS":
            setActiveRooms(msg.data)
            break;
          case "CREATE_SUCCESS":
            navigate(`/draw_online/${msg.data.id}`);
            break;
          case "ERROR": console.log("Error")
            break;
        }
      }
    }
  }, []);

  if (error) return <p>{error}</p>;
  if (loading) return <Loader position="absolute" />;

  return (
    <HomePageSection>
      <HomePageWrapper>
        <div>
          <button onClick={() => dispatch(UserLogoutThunk())}>logout</button>
        </div>
        <ActiveRoomsWrapper>
          <h3>Active rooms</h3>
          <ActiveRooms activeRooms={activeRooms} />
        </ActiveRoomsWrapper>
        <Wrapper>
          <CreateRoomComponent
            isLoading={loading}
            setIsLoading={setIsLoading}
            socket={socket}
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
