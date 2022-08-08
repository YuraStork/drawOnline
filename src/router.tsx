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

const setRoutes = (isAuth: boolean) =>
  isAuth
    ? [
      { path: "/", element: <HomePage /> },
      { path: "/draw", element: <LayoutComponent /> },
      { path: "/draw_online/:roomId", element: <OnlineDrawPage><OnlineCanvas /></OnlineDrawPage> },
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
  console.log(isAuth);
  const routes = useRoutes(setRoutes(isAuth));
  return routes;
};
