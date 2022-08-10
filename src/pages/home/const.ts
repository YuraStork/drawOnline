import { NavigateFunction } from "react-router-dom";
type Props = {
  setSocket: (s: WebSocket) => void;
  setActiveRooms: (e: any) => void;
  navigate: NavigateFunction;
  // setIsLoading: (e: boolean) => void;
  // setMessages: (e: any) => void;
  // setMessageLoading: (e: boolean) => void;
  // setError: (e: string) => void;
  // id: string;
};

export const SetRoomsConnection = (data: Props) => {
  const { setSocket, setActiveRooms, navigate } = data;
  const socket = new WebSocket("ws://localhost:5000/rooms");
  console.log("ROOMS WS");

  setSocket(socket);
  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        method: "GET_ROOMS",
      })
    );
  };

  socket.onmessage = (e) => {
    const msg: any = JSON.parse(e.data);

    switch (msg.method) {
      case "GET_ROOMS":
        setActiveRooms(msg.data);
        break;
      case "CREATE_SUCCESS":
        navigate(`/draw_online/${msg.data.id}`);
        break;
      case "JOIN_SUCCESS":
        console.log("%cJOIN", "background-color: green; color: white; padding: 5px 10px");
        navigate(`/draw_online/${msg.data.roomId}`, { state: { socket } })
        break;
      case "ERROR":
        console.log(msg.data.error);
        break;
    }
  };
};
