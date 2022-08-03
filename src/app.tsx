import { Loader } from "components/loader";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import { AuthorizedThunk } from "store/thunks/user.thunk";
import { Router } from "./router";

export const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((s) => s.user);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(AuthorizedThunk());
    setIsReady(true);
  }, []);

  if (isLoading || !isReady) return <Loader position="absolute" />;
  return <Router />;
};
