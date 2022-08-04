import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkRoom } from "api/rooms/checkRoom";
import { useAppSelector } from "store/store";
import { Loader } from "components/loader";

export const OnlineDrawPage: FC<any> = ({ children }) => {
  const user = useAppSelector((s) => s.user.data);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    if (roomId) {
      setIsLoading(true);
      checkRoom(roomId, user.id)
        .then(() => {
          setAccess(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (!roomId) navigate("/");
  if (isLoading) return <Loader position="absolute" />;
  if (!isLoading && !access) navigate(`/checkRoompassword/${roomId}`);

  return <>{children}</>;
};
