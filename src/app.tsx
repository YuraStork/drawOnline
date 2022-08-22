import { Loader } from "components/loader";
import { useEffect, useState } from "react";
import { RouterWrapper } from "./RouterWrapper";
import { useAppDispatch } from "store/store";
import { AuthorizedThunk } from "store/thunks/user_authorization_thunks/index";

export const App = () => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);

  console.log("APP");
  
  useEffect(() => {
    dispatch(AuthorizedThunk()).finally(() => setIsReady(true));
  }, []);

  if (!isReady) return <Loader position="absolute" />;
  return <RouterWrapper />;
};
