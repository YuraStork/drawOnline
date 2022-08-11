import { useRef } from "react";
import { io } from "socket.io-client";

export const useWebSocket = () => {
  const socket = useRef(io("ws://localhost:5000"));
  return { socket: socket.current };
};
