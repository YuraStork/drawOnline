import { Socket } from "socket.io-client";

export class Tool {
  protected canvas;
  protected ctx;
  protected width = 1200;
  protected height = 550;
  protected socket;
  protected id;
  protected strokeStyle = "#000";
  protected fillStyle = "#000";
  protected lineWidth = 1;

  constructor(canvas: React.MutableRefObject<HTMLCanvasElement>, socket: Socket<any, any>, id: string) {
    this.canvas = canvas;
    this.socket = socket;
    this.id = id;
    this.ctx = canvas.current.getContext("2d");
    this.width = canvas.current.width;
    this.height = canvas.current.height;
  }

  changeFillStyle(color: string) {
    if (this.ctx) {
      this.fillStyle = color;
      this.ctx.fillStyle = color;
    }
  }
  changeStrokeStyle(color: string) {
    if (this.ctx) {
      this.strokeStyle = color;
      this.ctx.strokeStyle = color;
    }
  }
  changeLineWidth(size: number) {
    if (this.ctx) {
      this.lineWidth = size;
      this.ctx.lineWidth = size;
    }
  }
  setSnapshot(snapshot: string | null) {
    if (snapshot) {
      const img = new Image();
      img.src = snapshot;
      img.onload = () => {
        if (this.ctx) {
          this.ctx.clearRect(0, 0, this.width, this.height)
          this.ctx.drawImage(img, 0, 0, this.width, this.height);
        }
      };
    }
  }
}
