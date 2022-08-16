import { WsContext } from "context/ws.context";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "store/store";
import { toastError } from "../../toast";
import { Loader } from "../../components/loader";

export const PrivateRoom = () => {
  const [roomPassword, setPassword] = useState("");
  const user = useAppSelector((s) => s.user.data);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { socket } = useContext(WsContext);
  
  const handleEnter = async () => {
    if (roomId) {
      setIsLoading(true);
      socket.emit("JOIN", {
        roomId,
        roomPassword,
        userId: user.id,
        userName: user.name,
      });
      socket.on("JOIN_SUCCESS", (id: string) => {
        navigate(`/draw_online/${id}`); setIsLoading(false)
      });
      socket.on("JOIN_ERROR", (e: string) => {
        setIsLoading(false);
        toastError(e)
      });
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
