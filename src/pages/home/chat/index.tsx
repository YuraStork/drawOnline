import { nanoid } from "@reduxjs/toolkit";
import { LittleLoader } from "components/littleLoader";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "store/store";
import { ChatMessage, ChatType } from "../types";
import { ChatWrapper, Message, MessagesWrapper } from "./styles";

export const Chat = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data } = useAppSelector((s) => s.user);
  const chatRef = useRef<HTMLDivElement>(null);
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    if (!socket) {
      const socket = new WebSocket("ws://localhost:5000/chat");
      console.log("socket", socket)
      setSocket(socket);

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            method: "chat",
          })
        );
      }

      socket.onmessage = (e) => {
        const msg: ChatType = JSON.parse(e.data);
        switch (msg.method) {
          case "chat":
            setIsLoading(false)
            setMessages(msg.data as ChatMessage[]);
            break;
          case "message":
            setMessages((pre) => [...pre, msg.data] as ChatMessage[]);
            if ((msg.data as ChatMessage).userId === data.id) {
              setMessageLoading(false)
            }
            break;
        }
      };
    }
  }, []);

  useEffect(()=>{
    chatRef.current?.scrollTo(0, 100000);
  },[messages])

  const handleSendMessage = () => {
    if (inputRef.current?.value) {
      setMessageLoading(true);
      socket?.send(
        JSON.stringify({
          data: {
            userId: data.id,
            avatar: data.avatar,
            name: data.name,
            message: inputRef.current?.value,
          },
          method: "message",
        })
      );
      inputRef.current.value = "";
    }
  };

  return (
    <ChatWrapper>
      <div ref={chatRef}>
        {isLoading ? <LittleLoader /> :
          messages.length &&
          messages.map((msg: ChatMessage) => (
            <MessagesWrapper key={nanoid()}>
              <div>
                <img src={msg.avatar} width={30} height={30} alt={msg.name} />
              </div>
              <Message myMessage={msg.userId === data.id}>
                <h4>{msg.name}</h4>
                <p>{msg.message}</p>
              </Message>
            </MessagesWrapper>
          ))
        }
      </div>
      <div>
        <input type="text" ref={inputRef} required={true} />
        <button onClick={handleSendMessage} disabled={messageLoading}>send</button>
      </div>
    </ChatWrapper>
  );
};
