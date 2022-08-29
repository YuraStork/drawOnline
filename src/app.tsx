import { Loader } from "components/loader";
import { useEffect, useState } from "react";
import { Router } from "./router";
import { useAppDispatch } from "store/store";
import { AuthorizedThunk } from "store/thunks/user_authorization_thunks/index";

export const App = () => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(AuthorizedThunk()).finally(() => setIsReady(true));
  }, []);

  if (!isReady) return <Loader position="absolute" />;
  return <Router />;
};
