import { Tool } from "./tool.class";

export class Square extends Tool {
  private mouseDown = false;
  private x1 = 0;
  private y1 = 0;
  private saved = "";

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
    this.saved = this.canvas.current.toDataURL();
  };

  private onMouseMove(e: MouseEvent) {
    if (this.mouseDown && this.ctx) {
      this.socket.send(JSON.stringify({
        method: "draw",
        tool: "square",
        id: this.id,
        x: e.offsetX,
        y: e.offsetY
      }))
      // let img = new Image();
      // img.src = this.saved;
      // img.onload = () => {
      //   Square.draw(this.ctx, e, img, this.x1, this.y1, this.canvas.current)
      // }
    }
  };

  private onMouseUp(e: MouseEvent) {
    this.mouseDown = false;
    this.x1 = 0;
    this.y1 = 0;
  };

  static draw(ctx: any, e: MouseEvent, img: HTMLImageElement, x1: number, y1: number, canvas: HTMLCanvasElement) {
    if (ctx) {
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.rect(x1, y1, e.offsetX - x1, e.offsetY - y1);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  }
};
