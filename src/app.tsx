import { Loader } from "components/loader";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import { AuthorizedThunk } from "store/thunks/user.thunk";
import { Router } from "./router";

export const App = () => {
  const dispatch = useAppDispatch();
  const { isReady } = useAppSelector(s => s.user);

  useEffect(() => {
    dispatch(AuthorizedThunk())
  }, []);

  if (!isReady) return <Loader position="absolute" />;
  return <Router />;
};
