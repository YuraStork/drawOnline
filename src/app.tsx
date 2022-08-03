import { Loader } from "components/loader";
import { useEffect, useState } from "react";
import { initializeUser } from "store/reducers/user.reducer";
import { useAppDispatch, useAppSelector } from "store/store";
import { getUserProfileThunk } from "store/thunks/user.thunk";
import { Router } from "./router";

export const App = () => {
  const dispatch = useAppDispatch();
  const { isAuth, data } = useAppSelector((s) => s.user);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(initializeUser());
    if (isAuth) {
      dispatch(getUserProfileThunk(data.id)).finally(() => setIsReady(true));
    } else {
      setIsReady(true);
    }
  }, []);

  if (!isReady) return <Loader position="absolute" />;
  return <Router />;
};
