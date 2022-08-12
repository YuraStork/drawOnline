import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkRoom } from "api/rooms/checkRoom";
import { useAppSelector } from "store/store";
import { Loader } from "components/loader";
import { AxiosError } from "axios";

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
    setIsLoading(true);
    checkRoom(roomId || "", user.id)
      .then((res) => {
        if (res.status === 200) {
          setAccess(true);
        }
      })
      .catch((e: AxiosError) => {
        console.log(e.status);
        navigate(`/checkRoompassword/${roomId}`);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader position="absolute" />;
  if (!access) return null;

  return <>{children}</>;
};
