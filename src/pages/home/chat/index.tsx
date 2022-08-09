import { nanoid } from "@reduxjs/toolkit";
import { LittleLoader } from "components/littleLoader";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "store/store";
import { ChatMessage } from "../types";
import { SetConnectionChat } from "./const";
import { ChatWrapper, Message, MessagesWrapper } from "./styles";

export const Chat = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data } = useAppSelector((s) => s.user);
  const chatRef = useRef<HTMLDivElement>(null);
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    if (!socket) {
      SetConnectionChat({
        id: data.id,
        setIsLoading,
        setMessageLoading,
        setMessages,
        setSocket,
        setError,
      });
    }
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo(0, 100000);
  }, [messages]);

  const handleSendMessage = () => {
    if (inputRef.current?.value) {
      setMessageLoading(true);
      socket?.send(
        JSON.stringify({
          data: {
            userId: data.id,
            name: data.name,
            message: inputRef.current?.value,
          },
          method: "MESSAGE",
        })
      );
      inputRef.current.value = "";
    }
  };

  return (
    <ChatWrapper>
      <div ref={chatRef}>
        {error ? (
          <span>{error}</span>
        ) : isLoading ? (
          <LittleLoader />
        ) : (
          messages.map((msg: ChatMessage) => (
            <MessagesWrapper key={nanoid()}>
              <div>
                <img
                  src={`http://localhost:5000/users/${msg.userId}/${msg.userId}_avatar.png`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src =
                      "http://localhost:5000/users/defaultUserImage.png";
                  }}
                  width={30}
                  height={30}
                  alt={msg.name}
                />
              </div>
              <Message myMessage={msg.userId === data.id}>
                <h4>{msg.name}</h4>
                <p>{msg.message}</p>
              </Message>
            </MessagesWrapper>
          ))
        )}
      </div>
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={handleSendMessage} disabled={messageLoading}>
          send
        </button>
      </div>
    </ChatWrapper>
  );
};
