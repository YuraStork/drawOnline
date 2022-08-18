import { toastSuccess } from "./../../../toast/index";
import { Socket } from "socket.io-client";
import { NavigateFunction } from "react-router-dom";
import {
  Circle,
  Eraser,
  Line,
  Pen,
  Square,
} from "../../../canvas_classes/index";

export const SetDrawConnection = (
  socket: Socket<any, any>,
  canvasRef: any,
  roomId: string,
  name: string,
  navigate: NavigateFunction,
  fillStyle: string,
  strokeStyle: string,
  lineWidht: number,
) => {
  socket.emit("CONNECTION_DRAW", { userName: name, roomId });
  socket.on("CONNECTION_DRAW", (data: string) => toastSuccess(data + "joined"));

  socket.on("FINISH_DRAW", () => {
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.beginPath();
  });
  socket.on("CASE_EXIT", () => {
    navigate("/");
  });

  socket.on("DRAW", (data: any) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext("2d");
      switch (data.tool) {
        case "pen":
          Pen.drawOnline(
            ctx,
            data.x,
            data.y,
            data.strokeStyle,
            data.lineWidth,
          );
          break;
        case "square":
          Square.drawOnline(ctx, data.x1, data.y1, data.width, data.height);
          break;
        case "circle":
          Circle.drawOnline(ctx, data.x1, data.y1, data.a, data.b);
          break;
        case "eraser":
          Eraser.draw(ctx, data.x1, data.y1);
          break;
        case "line":
          Line.drawOnline(ctx, data.x1, data.y1, data.x2, data.y2);
          break;
        default:
          Pen.drawOnline(
            ctx,
            data.x,
            data.y,
            data.strokeStyle,
            data.lineWidth,
          );
          break;
      }
    }
  });
};
