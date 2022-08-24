import { WsContext } from "context/ws.context";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "store/store";
import { ToolsTypes } from "types/canvas";
import {
  SetDrawConnection,
  ClearDrawConnection,
} from "./methods/setDrawConnection";
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
  const [fillStyle, setFillStyle] = useState("#000");
  const [strokeStyle, setStrokeStyle] = useState("#000");
  const [lineWidth, setLineWidth] = useState(1);
  const [snapshotList, setSnapshotList] = useState<string[]>([]);
  const [snapshotIndex, setSnapshotIndex] = useState(-1);
  const { socket } = useContext(WsContext);
  const { roomId } = useParams<ParamsProps>();
  const setToolhandler = (tool: ToolsTypes) => setTool(tool);
  const { name } = useAppSelector((s) => s.user.data);

  useEffect(() => {
    canvasRef.current.width = document.body.clientWidth >= 1400 ? 1190 : document.body.clientWidth - 210;
    canvasRef.current.height = document.body.clientHeight - 150;
    handleSnapshot({
      snapshotIndex,
      snapshotList,
      setSnapshotIndex,
      setSnapshotList,
      canvasRef,
    });
    SetDrawConnection(
      socket,
      canvasRef,
      roomId || "",
      name,
      navigate,
      fillStyle,
      strokeStyle,
      lineWidth
    );
    return () => {
      ClearDrawConnection(socket);
    };
  }, []);

  useEffect(() => {
    draw();
  }, [tool, fillStyle, strokeStyle, lineWidth, snapshotIndex]);

  const draw = () => {
    const myCanvas = new Tool(canvasRef, socket, roomId || "1");
    myCanvas.changeFillStyle(fillStyle);
    myCanvas.changeStrokeStyle(strokeStyle);
    myCanvas.changeLineWidth(lineWidth);
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
    changeFillStyle: setFillStyle,
    changeStrokeStyle: setStrokeStyle,
    changeLineWidth: setLineWidth,
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
