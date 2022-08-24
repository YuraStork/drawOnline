import { checkRoom } from "api/rooms/checkRoom";
import { NavigateFunction } from "react-router-dom";

type Props = {
  setIsLoading: (e: boolean) => void;
  setAccess: (e: boolean) => void;
  roomId: string | undefined;
  userId: string;
  navigate: NavigateFunction;
};

export const CheckUserInRoom = async (data: Props) => {
  const { navigate, roomId, setIsLoading, userId, setAccess } = data;

  if (!roomId) {
    navigate("/not-found");
    return false;
  }

  setIsLoading(true);

  try {
    const response = await checkRoom(roomId, userId);

    if (response.status === 200) {
      setAccess(true);
    }
    setIsLoading(false);
    return true;

  } catch (e) {
    navigate(`/checkRoompassword/${roomId}`);
  }
};
