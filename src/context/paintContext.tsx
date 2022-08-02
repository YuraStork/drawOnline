import React, { createContext } from "react";
import { ToolsTypes } from "../hooks/canvas.hook";

type PaintContextTypes = {
  canvasRef: React.Ref<HTMLCanvasElement>;
  setToolhandler: (tool: ToolsTypes) => void;
  tool: ToolsTypes;
  changeBackgroundColor: (e: string) => void,
  changeBorderColor: (e: string) => void
  changeBorderSize: (e: number) => void,
  handleReset: () => void,
  handleRedo: () => void,
  handleSnapshot: () => void,
  snapshot: string | null,
};

export const PaintContext = createContext<PaintContextTypes>({
  canvasRef: null,
  setToolhandler: () => { },
  tool: "pen",
  changeBackgroundColor: () => { },
  changeBorderColor: () => { },
  changeBorderSize: () => { },
  handleReset: () => { },
  handleRedo: () => { },
  handleSnapshot: () => { },
  snapshot: null
});
