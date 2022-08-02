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
      let img = new Image();
      img.src = this.saved;
      img.onload = () => {
        this.draw(e, img)
      }
    }
  };

  private onMouseUp(e: MouseEvent) {
    this.mouseDown = false;
    this.x1 = 0;
    this.y1 = 0;
  };

  private draw(e: MouseEvent, img: HTMLImageElement) {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.current.width, this.canvas.current.height);
      this.ctx.beginPath();
      this.ctx.rect(this.x1, this.y1, e.offsetX - this.x1, e.offsetY - this.y1);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
};
