import { Tool } from "./tool.class";

export class Eraser extends Tool {
  private mouseDown = false;
  private x1 = 0;
  private y1 = 0;

  constructor(canvas: React.MutableRefObject<HTMLCanvasElement>, socket: WebSocket, id: string) {
    super(canvas, socket, id);
    this.listen();
  }

  private listen() {
    this.canvas.current.onmousedown = this.onMouseDown.bind(this);
    this.canvas.current.onmousemove = this.onMouseMove.bind(this);
    this.canvas.current.onmouseup = this.onMouseUp.bind(this);
  }

  private onMouseDown(e: MouseEvent) {
    this.mouseDown = true;
    this.x1 = e.offsetX;
    this.y1 = e.offsetY;
  };

  private onMouseMove(e: MouseEvent) {
    if (this.ctx && this.mouseDown) {
      this.ctx.beginPath();
      this.ctx.rect(this.x1, this.y1, 40, 40);
      this.ctx.fillStyle = "#ececec";
      this.ctx.fill();
      this.ctx.closePath();
    }

    this.x1 = e.offsetX;
    this.y1 = e.offsetY;
  };

  private onMouseUp(e: MouseEvent) {
    this.mouseDown = false;
  }
};
