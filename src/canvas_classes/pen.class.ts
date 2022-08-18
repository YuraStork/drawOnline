import { Socket } from "socket.io-client";
import { Tool } from "./tool.class";

export class Pen extends Tool {
  private mouseDown = false;

  constructor(
    canvas: React.MutableRefObject<HTMLCanvasElement>,
    socket: Socket<any, any>,
    id: string
  ) {
    super(canvas, socket, id);
    this.listen();
  }

  private listen() {
    this.canvas.current.onmousedown = this.onMouseDown.bind(this);
    this.canvas.current.onmousemove = this.onMouseMove.bind(this);
    this.canvas.current.onmouseup = this.onMouseUp.bind(this);
  }

  private onMouseUp(e: MouseEvent) {
    this.mouseDown = false;
    this.socket.emit("FINISH_DRAW", {
      roomId: this.id,
    });
  }

  private onMouseDown(e: MouseEvent) {
    this.mouseDown = true;
    if (this.ctx) {
      this.ctx.beginPath();
    }
  }

  private onMouseMove(e: MouseEvent) {
    if (this.mouseDown && this.ctx) {
      this.socket.emit("DRAW", {
        tool: "pen",
        roomId: this.id,
        x: e.offsetX,
        y: e.offsetY,
        lineColor: this.ctx.strokeStyle,
        lineWidth: this.ctx.lineWidth,
      });
    }
  }

  static draw(ctx: any, x: number, y: number, strokeStyle: string, lineWidth: number) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  static drawOnline(
    ctx: any,
    x: number,
    y: number,
    lineColor: string,
    lineWidht: number,
    oldColor: string,
    oldWidht: number
  ) {
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidht;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeStyle = oldColor;
    ctx.lineWidth = oldWidht;
  }
}
