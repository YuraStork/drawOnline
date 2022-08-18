import React, { createContext } from "react";
import { ToolsTypes } from "types/canvas";

type PaintContextTypes = {
  canvasRef: React.Ref<HTMLCanvasElement>;
  setToolhandler: (tool: ToolsTypes) => void;
  tool: ToolsTypes;
  changeFillStyle: (e: string) => void,
  changeStrokeStyle: (e: string) => void
  changeLineWidth: (e: number) => void,
  handleReset: () => void,
  handleRedo: () => void,
  handleSnapshot: (data: any) => void,
  snapshot: string | null,
};

export const PaintContext = createContext<PaintContextTypes>({
  canvasRef: null,
  setToolhandler: () => { },
  tool: "pen",
  changeFillStyle: () => { },
  changeStrokeStyle: () => { },
  changeLineWidth: () => { },
  handleReset: () => { },
  handleRedo: () => { },
  handleSnapshot: () => { },
  snapshot: null
});
