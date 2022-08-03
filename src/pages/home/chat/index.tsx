import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "store/store";
import { ChatMessage, ChatType } from "../types";
import { Message, MessageWrapper } from "./styles";

export const Chat = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[] | []>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data } = useAppSelector(s => s.user);

  useEffect(() => {
    if (!socket) {
      const socket = new WebSocket("ws://localhost:5000/chat");
      setSocket(socket);

      socket.onopen = () => socket.send(JSON.stringify({
        method: "chat"
      }))

      socket.onmessage = (e) => {
        const msg: ChatType = JSON.parse(e.data);
        console.log("MSG", msg)
        switch (msg.method) {
          case "chat": setMessages(msg.data as ChatMessage[]); break;
          case "message": setMessages((pre) => [...pre, msg.data] as ChatMessage[]); break;
        }
      }
    }

  }, [])

  const handleSendMessage = () => {
    socket?.send(JSON.stringify({
      data: {
        id: data.id,
        avatar: data.avatar,
        userName: data.name,
        message: inputRef.current?.value
      },
      method: "message",
    }))
  }

  return <div>
    {messages.length && messages.map((msg: ChatMessage) => <MessageWrapper key={nanoid()}>
      <div>
        <img src={msg.avatar} width={30} height={30} alt={msg.userName} />
      </div>
      <Message myMessage={msg.id === data.id}>
        <h4>{msg.userName}</h4>
        <p>{msg.message}</p>
      </Message>
    </MessageWrapper>)}
    <input type="text" ref={inputRef} />
    <button onClick={handleSendMessage}>send</button>
  </div>
}