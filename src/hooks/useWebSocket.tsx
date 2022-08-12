import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAppSelector } from "store/store";

export const useWebSocket = () => {
  const socket = useRef(io("ws://localhost:5000"));
  const { id } = useAppSelector(s => s.user.data)

  useEffect(() => {
    socket.current.id = id;
  }, [])

  return { socket: socket.current };
};
