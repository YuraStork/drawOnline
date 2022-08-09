import { ChatError, ChatMessage, ChatType } from "../types";

type Props = {
  setSocket: (s: WebSocket) => void;
  setIsLoading: (e: boolean) => void;
  setMessages: (e: any) => void;
  setMessageLoading: (e: boolean) => void;
  setError: (e: string) => void;
  id: string;
};

export const SetConnectionChat = (data: Props) => {
  const { setSocket, setIsLoading, setMessages, id, setMessageLoading, setError } = data;
  const socket = new WebSocket("ws://localhost:5000/chat");
  console.log("CHAT WS");
  setSocket(socket);

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        method: "GET_CHAT",
      })
    );
  };

  socket.onmessage = (e) => {
    const msg: ChatType = JSON.parse(e.data);
    switch (msg.method) {

      case "GET_CHAT":
        setIsLoading(false);
        setMessages(msg.data as ChatMessage[]);
        break;

      case "MESSAGE":
        setMessages((pre: ChatMessage[]) => [...pre, msg.data] as ChatMessage[]);
        if ((msg.data as ChatMessage).userId === id) {
          setMessageLoading(false);
        }
        break;

      case "ERROR":
        setError((msg.data as ChatError).error || "Error")
        break;
    };
  };
}