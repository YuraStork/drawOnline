import { Loader } from "components/loader";
import { useEffect, useState } from "react";
import { initializeUser } from "store/reducers/user.reducer";
import { useAppDispatch } from "store/store";
import { Router } from "./router";

export const App = () => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(initializeUser());
    setIsReady(true);
  }, [])

  if (!isReady) return <Loader />
  return (
    <Router />
  );
};
