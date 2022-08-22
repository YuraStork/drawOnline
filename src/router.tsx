import { Navigate, useRoutes } from "react-router-dom";
import { AuthPage } from "pages/auth/index";
import { UserCabinet } from "pages/userCabinet";
import { getUser } from "store/selectors/user.selector";
import { useAppSelector } from "store/store";
import { LayoutComponent } from "pages/layout";
import { OnlineCanvas } from "pages/onlineDrawPage/canvas";
import { PrivateRoom } from "pages/confirmAccessPage";
import { ServerErrorPage } from "pages/serverErrorPage";
import { NotFoundPage } from "pages/notfoundPage";
import { HomePage } from "pages/home";
import { OnlineDrawPage } from "pages/onlineDrawPage";
import { WsContext } from "context/ws.context";
import { ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Loader } from "components/loader";
import { nanoid } from "@reduxjs/toolkit";
import {socket} from "./socket";

// const getSocketId = () => {
//   const id = localStorage.getItem("socketId");
//   if (id) {
//     return id;
//   }

//   const newId = nanoid();
//   console.log("NEW ID", newId);

//   localStorage.setItem("socketId", newId);

//   return newId;
// };

// const Wrapper = ({ children }: { children: ReactNode }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     if (!socket) {
//       const socket = io("http://localhost:5000", { query: { id: getSocketId() } });
//       socket.on("connect", () => {
//         setSocket(socket);
//       })
//     }
//     return () => {
//       if (socket) {
//         socket.close();
//       }
//     };
//   }, []);

//   if (!socket) return <Loader position="absolute" />;
//   return <WsContext.Provider value={{ socket }}>{children}</WsContext.Provider>;
// };

const setRoutes = (isAuth: boolean) =>
  isAuth
    ? [
      { path: "/", element: <HomePage /> },
      { path: "/draw", element: <LayoutComponent /> },
      {
        path: "/draw_online/:roomId",
        element: (
          <OnlineDrawPage>
            <OnlineCanvas />
          </OnlineDrawPage>
        ),
      },
      { path: "/checkRoompassword/:roomId", element: <PrivateRoom /> },
      { path: "/cabinet", element: <UserCabinet /> },
      { path: "/server-error", element: <ServerErrorPage /> },
      { path: "/authorization", element: <Navigate to="/" /> },
      { path: "*", element: <NotFoundPage /> },
    ]
    : [
      { path: "/authorization", element: <AuthPage /> },
      { path: "*", element: <Navigate to="/authorization" /> },
    ];

export const Router = () => {
  const { isAuth } = useAppSelector(getUser);
  const routes = useRoutes(setRoutes(isAuth));

  console.log("ISAUTH", isAuth);
  console.log(
    "%c Router RENDER ",
    "background-color: blue; color:#fff; padding: 5px 10px;"
  );

  // if (isAuth) return<WsContext.Provider value={{ socket }}>{routes}</WsContext.Provider>;
  return routes;
};
