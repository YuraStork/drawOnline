import { handleAuthorization } from "api/user.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSavedUser, saveUserInStorage } from "services/token.service";
import { SavedUserObject, UserLoginFormData } from "types";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<SavedUserObject | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    initializationUser();
  }, []);

  function initializationUser() {
    const user = getSavedUser();
    if (user) {
      setUserData({ token: user.token, user: user.user });
      setIsAuth(true);
      navigate("/home");
    }
    setIsReady(true);
  };

  async function login(data: UserLoginFormData) {
    setIsLoading(true);
    const res = await handleAuthorization(data);
    if (res) {
      saveUserInStorage(res.data);
      setIsAuth(true);
      setUserData(res.data);
      navigate("/home");
    }

    setIsLoading(false);
    setIsReady(true);
  }

  function logout() {
    localStorage.removeItem("user");
    setIsAuth(false);
    setUserData(null);
    navigate("/login");
  }

  return { isAuth, isReady, userData, login, logout, isLoading };
};
