import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeUser } from "store/reducers/user.reducer";
import { useAppDispatch } from "store/store";
import { Router } from "./router";

export const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeUser());
    navigate("/");
  }, [])

  return (
    <Router />
  );
};
