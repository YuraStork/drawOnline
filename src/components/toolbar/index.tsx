import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "store/store";
import { ToolsTypes } from "types/canvas";
import { PaintContext } from "../../context/paintContext";
import { StyledToolbar, ToolButton } from "./styles";

export const Toolbar = () => {
  const { setToolhandler, tool, changeBackgroundColor, handleRedo, handleReset, snapshot } = useContext(PaintContext);
  const { roomId } = useParams();
  const { id } = useAppSelector(s => s.user.data)
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const navigate = useNavigate();

  const handleChangeTool = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).tagName === "BUTTON") {
      setToolhandler((e.target as HTMLButtonElement).dataset.tool as ToolsTypes)
    }
  }
  useEffect(() => {
    if (!socket) {
      const socket = new WebSocket("ws://localhost:5000/rooms");
      setSocket(socket);
    }
  }, [])

  const handleExitFromRoom = () => {
    socket?.send(JSON.stringify({
      method: "EXIT",
      data: {
        roomId,
        userId: id
      }
    }))
    navigate("/");
  }
  const handleSavePhoto = async () => {
    if (snapshot) {
      const res = await fetch(snapshot);
      const blob = await res.blob();
      const file = new File([blob], "image", { type: "image/png" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = "image.png";
      a.click();
    }
  }

  return (
    <StyledToolbar>
      <div onClickCapture={handleChangeTool}>
        <ToolButton img="../assets/pen.png" data-tool="pen" active={tool === "pen"} />
        <ToolButton img="../assets/square.png" data-tool="square" active={tool === "square"} />
        <ToolButton img="../assets/circle.png" data-tool="circle" active={tool === "circle"} />
        <ToolButton img="../assets/eraser.png" data-tool="eraser" active={tool === "eraser"} />
        <ToolButton img="../assets/line.png" data-tool="line" active={tool === "line"} />
        <input type="color" name="color" onChange={(e) => changeBackgroundColor(e.target.value)} />
      </div>

      <div>
        <ToolButton img="../assets/left-arrow.png" onClick={handleReset} />
        <ToolButton img="../assets/right-arrow.png" onClick={handleRedo} />
        <ToolButton img="../assets/diskette.png" onClick={handleSavePhoto} />
        <button onClick={handleExitFromRoom}>Exit from room</button>
      </div>
    </StyledToolbar>
  );
};
