import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "store/store";
import { checkRoomPassword } from "../../api/rooms/checkRoomPassword";
import { Loader } from "../../components/loader";

export const PrivateRoom = () => {
  const [roomPassword, setPassword] = useState("");
  const user = useAppSelector(s => s.user.data)
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { roomId } = useParams()

  const handleEnter = async () => {
    try {
      if (roomId) {
        setIsLoading(true);
        await checkRoomPassword({ roomId, roomPassword, userId: user.id, userName: user.name });
        navigate(`/draw_online/${roomId}`);
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader position="absolute" />
      ) : (
        <>
          <input
            type="password"
            value={roomPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleEnter}>enter</button>
        </>
      )}
    </div>
  );
};
