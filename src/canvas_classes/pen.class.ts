import { Tool } from "./tool.class";

export class Pen extends Tool {
  private mouseDown = false;

  constructor(canvas: React.MutableRefObject<HTMLCanvasElement>, socket: WebSocket, id: string) {
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
    this.socket.send(JSON.stringify({
      method: "finish",
      id: this.id,
    }))
  }

  private onMouseDown(e: MouseEvent) {
    this.mouseDown = true;
    if (this.ctx) {
      this.ctx.beginPath();
    }
  }

  private onMouseMove(e: MouseEvent) {
    if (this.mouseDown && this.ctx) {
      this.socket.send(JSON.stringify({
        method: "draw",
        tool: "pen",
        id: this.id,
        x: e.offsetX,
        y: e.offsetY
      }))
    }
  }

  static draw(ctx: any, x: number, y: number) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
