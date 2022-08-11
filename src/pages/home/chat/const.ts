import { Socket } from "socket.io-client";
import { ChatMessage } from "../types";

export const GET_CHAT = "GET_CHAT";
export const MESSAGE = "MESSAGE";
export const ERROR = "ERROR";

type Props = {
  socket: Socket<any, any>;
  setIsLoading: (e: boolean) => void;
  setMessages: (e: any) => void;
  setMessageLoading: (e: boolean) => void;
  setError: (e: string) => void;
  id: string;
};

export const SetConnectionChat = (data: Props) => {
  const { setIsLoading, setMessages, id, setMessageLoading, setError, socket } = data;

  socket.emit(GET_CHAT);
  socket.on(ERROR, (data: string) => setError(data));
  socket.on(GET_CHAT, (data: ChatMessage[]) => {
    setIsLoading(false);
    setMessages(data);
  });
  socket.on(MESSAGE, (data: ChatMessage) => {
    setMessages((pre: ChatMessage[]) => [...pre, data]);
    if (data.userId === id) {
      setMessageLoading(false);
    }
  });
};
