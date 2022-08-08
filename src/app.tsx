import { Loader } from "components/loader";
import { useEffect, useState } from "react";
import { useAppDispatch } from "store/store";
import { AuthorizedThunk } from "store/thunks/user.thunk";
import { Router } from "./router";

export const App = () => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(AuthorizedThunk());
    setIsReady(true);
  }, []);

  if (!isReady) return <Loader position="absolute" />;
  return <Router />;
};
