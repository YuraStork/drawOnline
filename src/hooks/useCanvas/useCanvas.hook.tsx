import { WsContext } from "context/ws.context";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "store/store";
import { ToolsTypes } from "types/canvas";
import { SetDrawConnection } from "./methods/setDrawConnection";
import { handleSnapshot, pushRedo, pushUndo } from "./methods/snapshot";
import {
  Circle,
  Eraser,
  Line,
  Pen,
  Square,
  Tool,
} from "../../canvas_classes/index";

type ParamsProps = {
  roomId: string;
};

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const navigate = useNavigate();
  const [tool, setTool] = useState<ToolsTypes>("pen");
  const [backgroundColor, setBackgroundColor] = useState("#000");
  const [borderColor, setBorderColor] = useState("#000");
  const [borderSize, setBorderSize] = useState(1);
  const [snapshotList, setSnapshotList] = useState<string[]>([]);
  const [snapshotIndex, setSnapshotIndex] = useState(-1);
  const { socket } = useContext(WsContext);
  const { roomId } = useParams<ParamsProps>();
  const setToolhandler = (tool: ToolsTypes) => setTool(tool);
  const { name } = useAppSelector((s) => s.user.data);

  useEffect(() => {
    canvasRef.current.width = 1100;
    canvasRef.current.height = 550;
    handleSnapshot({
      snapshotIndex,
      snapshotList,
      setSnapshotIndex,
      setSnapshotList,
      canvasRef,
    });
    SetDrawConnection(socket, canvasRef, roomId || "", name, navigate, borderColor, borderSize, backgroundColor);
  }, []);

  useEffect(() => {
    draw();
  }, [tool, backgroundColor, borderColor, borderSize, snapshotIndex]);

  const draw = () => {
    const myCanvas = new Tool(canvasRef, socket, roomId || "1");
    myCanvas.changeBackgroundColor(backgroundColor);
    myCanvas.changeBorderColor(borderColor);
    myCanvas.changeBorderSize(borderSize);
    myCanvas.setSnapshot(snapshotList[snapshotIndex]);

    switch (tool) {
      case "pen":
        new Pen(canvasRef, socket, roomId || "1");
        break;
      case "square":
        new Square(canvasRef, socket, roomId || "1");
        break;
      case "circle":
        new Circle(canvasRef, socket, roomId || "1");
        break;
      case "eraser":
        new Eraser(canvasRef, socket, roomId || "1");
        break;
      case "line":
        new Line(canvasRef, socket, roomId || "1");
        break;
      default:
        new Pen(canvasRef, socket, roomId || "1");
    }
  };

  return {
    canvasRef,
    setToolhandler,
    draw,
    tool,
    changeBackgroundColor: setBackgroundColor,
    changeBorderColor: setBorderColor,
    changeBorderSize: setBorderSize,
    handleSnapshot: () =>
      handleSnapshot({
        snapshotIndex,
        snapshotList,
        setSnapshotIndex,
        setSnapshotList,
        canvasRef,
      }),
    handleReset: () => pushUndo(snapshotIndex, setSnapshotIndex),
    handleRedo: () => pushRedo(snapshotIndex, snapshotList, setSnapshotIndex),
    snapshot: snapshotList[snapshotList.length - 1] || null,
  };
};
