import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checkRoomPassword } from "../../api/rooms/checkRoomPassword";
import { Loader } from "../../components/loader";
type StateProps = {
  redirect?: boolean;
}

export const PrivateRoom = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams()
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate("/")
    }
  }, [])

  const handleEnter = async () => {
    try {
      setIsLoading(true);
      const res = await checkRoomPassword(id || "", password);
      navigate(`/draw_online/${id}`);
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleEnter}>enter</button>
        </>
      )}
    </div>
  );
};
