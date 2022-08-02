import { Navigate, useRoutes } from "react-router-dom";
import { LoginPage } from "pages/auth/login";
import { RegistrationPage } from "pages/auth/registration";
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
    { path: "/login", element: <>You have already signed in</> },
    { path: "/registration", element: <>You have already signed up</> },
    { path: "*", element: <NotFoundPage /> },
  ]);

  const notAuthorized = useRoutes([
    { path: "/login", element: <LoginPage /> },
    { path: "/registration", element: <RegistrationPage /> },
    { path: "*", element: <Navigate to="/login" /> },
  ]);

  return isAuth ? authorized : notAuthorized;
};
