import { toastSuccess } from "./../../../toast/index";
import { Pen } from "../../../canvas_classes/pen.class";
import { Square } from "../../../canvas_classes/square.class";
import { Socket } from "socket.io-client";
import { NavigateFunction } from "react-router-dom";

export const SetDrawConnection = (
  socket: Socket<any, any>,
  canvasRef: any,
  roomId: string,
  name: string,
  navigate: NavigateFunction
) => {
  socket.emit("CONNECTION_DRAW", { userName: name, roomId });
  socket.on("CONNECTION_DRAW", (data: string) => toastSuccess(data + "joined"));

  socket.on("FINISH_DRAW", () => {
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.beginPath();
  });
  socket.on("CASE_EXIT", () => {
    navigate("/")
  })
  socket.on("DRAW", (data: any) => {
    console.log("DRAW", data)
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext("2d");
      switch (data.tool) {
        case "pen":
          Pen.draw(ctx, data.x, data.y);
          break;
        // case "square":
        //   Square.draw(
        //     ctx,
        //     data.x,
        //     data.y,
        //     canvasRef.current.width,
        //     canvasRef.current.height,
        //     canvasRef.current
        //   );
        //   break;
      }
    }
  });
};
