import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "store/store";
import { ToolsTypes } from "types/canvas";
import { SetDrawConnection, ClearDrawConnection } from "./methods/setDrawConnection";
import { handleSnapshot, pushRedo, pushUndo } from "./methods/snapshot";
import { Tool } from "../../canvas_classes/index";
import { SetTool } from "./const";
import { useSocket } from "hooks/useSocket";

type ParamsProps = {
  roomId: string;
};

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const navigate = useNavigate();
  const [tool, setTool] = useState<ToolsTypes>("pen");
  const [snapshotList, setSnapshotList] = useState<string[]>([]);
  const [snapshotIndex, setSnapshotIndex] = useState(-1);
  const { socket } = useSocket();
  const { roomId } = useParams<ParamsProps>();
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
    SetTool({ canvasRef, roomId: roomId!, socket, tool })
    SetDrawConnection({ socket, canvasRef, roomId: roomId || "", name, navigate, fillStyle: Tool.fillStyle, strokeStyle: Tool.strokeStyle, lineWidth: Tool.lineWidth, setSnapshotList, snapshotList, setSnapshotIndex, snapshotIndex });

    return () => {
      ClearDrawConnection(socket);
    };
  }, []);

  useEffect(() => {
    SetTool({ canvasRef, roomId: roomId!, socket, tool })
  }, [tool])

  useEffect(() => {
   console.log(snapshotIndex, snapshotList);
  }, [snapshotIndex])

  return {
    canvasRef,
    tool,
    setToolhandler: (tool: ToolsTypes) => setTool(tool),
    changeFillStyle: (color: string) => Tool.changeFillStyle(canvasRef.current.getContext("2d"), color),
    changeStrokeStyle: (color: string) => Tool.changeStrokeStyle(canvasRef.current.getContext("2d"), color),
    changeLineWidth: (size: number) => Tool.changeLineWidth(canvasRef.current.getContext("2d"), size),
    handleSnapshot: () =>
      handleSnapshot({
        snapshotIndex,
        snapshotList,
        setSnapshotIndex,
        setSnapshotList,
        canvasRef,
      }),
    handleReset: () => pushUndo(canvasRef.current.getContext("2d"), snapshotList, snapshotIndex, setSnapshotIndex),
    handleRedo: () => pushRedo(canvasRef.current.getContext("2d"), snapshotList, snapshotIndex, setSnapshotIndex),
    snapshot: snapshotList[snapshotIndex] || null,
  };
};
