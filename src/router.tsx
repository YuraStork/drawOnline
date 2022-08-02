import { Navigate, useRoutes } from "react-router-dom";
import { AuthPage } from "pages/auth/index";
import { UserCabinet } from "pages/userCabinet";
import { getUser } from "store/selectors/user.selector";
import { useAppSelector } from "store/store";
import { LayoutComponent } from "pages/layout";
import { EnterRoomWrapper } from "pages/enterRoomPage";
import { DrawOnlinePage } from "pages/drawOnlinePage";
import { PrivateRoom } from "pages/confirmAccessPage";
import { ServerErrorPage } from "pages/serverErrorPage";
import { NotFoundPage } from "pages/notfoundPage";
import { HomePage } from "pages/home";

export const Router = () => {
  const { isAuth } = useAppSelector(getUser);

  const authorized = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/draw", element: <LayoutComponent /> },
    { path: "/draw_online/:id", element: <EnterRoomWrapper><DrawOnlinePage /></EnterRoomWrapper> },
    { path: "/checkRoompassword/:id", element: <PrivateRoom /> },
    { path: "/cabinet", element: <UserCabinet /> },
    { path: "/server-error", element: <ServerErrorPage /> },
    { path: "*", element: <NotFoundPage /> },
  ]);

  const notAuthorized = useRoutes([
    { path: "/authorization", element: <AuthPage /> },
    { path: "*", element: <Navigate to="/login" /> },
  ]);

  return isAuth ? authorized : notAuthorized;
};
