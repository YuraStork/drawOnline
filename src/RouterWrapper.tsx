import { WsContext } from "context/ws.context";
import { Router } from "./router";
import { socket } from "./socket"

export const RouterWrapper = () => {
  return <WsContext.Provider value={{ socket }}><Router /></WsContext.Provider>;
};
