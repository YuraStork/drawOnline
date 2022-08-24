import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "store/store";
import { Loader } from "components/loader";
import { CheckUserInRoom } from "./const";

type ParamsProps = {
  roomId: string;
};

export const OnlineDrawPage: FC<any> = ({ children }) => {
  const user = useAppSelector((s) => s.user.data);
  const { roomId } = useParams<ParamsProps>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    CheckUserInRoom({ navigate, roomId, setIsLoading, userId: user.id, setAccess });
  }, []);

  if (isLoading) return <Loader position="absolute" />;
  if (!access) return null;

  return children;
};
