import { createContext } from "react";
import { AuthContextTypes } from "types";

export const AuthContext = createContext<AuthContextTypes>({
  isAuth: false,
  isReady: false,
  login: () => { },
  logout: () => { },
  userData: null,
  isLoading: false
});
