import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkRoom } from "../../api/rooms/checkRoom";
import { Loader } from "../../components/loader";

export const EnterRoomWrapper: FC<any> = ({ children }) => {
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const [room, setRoom] = useState(false);

  useEffect(() => {
    if (!id) navigate("/");
    else {
      setIsloading(true);
      checkRoom(id)
        .then((res) => {
          setRoom(true);
        })
        .catch((e) => {
          navigate(`/checkRoompassword/${id}`, { state: true });
        })
        .finally(() => setIsloading(false));
    }
  }, []);

  if (isLoading || !room) return <Loader position="absolute" />;
  return <>{children}</>;
};
