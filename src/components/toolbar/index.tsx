import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PaintContext } from "../../context/paintContext";
import { ToolsTypes } from "../../hooks/canvas.hook";
import { StyledToolbar, ToolButton } from "./styles";

export const Toolbar = () => {
  const { setToolhandler, tool, changeBackgroundColor, handleRedo, handleReset, snapshot } = useContext(PaintContext);

  const handleChangeTool = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).tagName === "BUTTON") {
      setToolhandler((e.target as HTMLButtonElement).dataset.tool as ToolsTypes)
    }
  }

  const handleSavePhoto = async () => {
    if (snapshot) {
      const res = await fetch(snapshot);
      const blob = await res.blob();
      const file = new File([blob], "image", { type: "image/png" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = "image.png";
      a.click();
    }
  }

  return (
    <StyledToolbar>
      <div onClickCapture={handleChangeTool}>
        <ToolButton img="../assets/pen.png" data-tool="pen" active={tool === "pen"} />
        <ToolButton img="../assets/square.png" data-tool="square" active={tool === "square"} />
        <ToolButton img="../assets/circle.png" data-tool="circle" active={tool === "circle"} />
        <ToolButton img="../assets/eraser.png" data-tool="eraser" active={tool === "eraser"} />
        <ToolButton img="../assets/line.png" data-tool="line" active={tool === "line"} />
        <input type="color" name="color" onChange={(e) => changeBackgroundColor(e.target.value)} />
      </div>

      <div>
        <ToolButton img="../assets/left-arrow.png" onClick={handleReset} />
        <ToolButton img="../assets/right-arrow.png" onClick={handleRedo} />
        <ToolButton img="../assets/diskette.png" onClick={handleSavePhoto} />
        <Link to="/">Home</Link>
      </div>
    </StyledToolbar>
  );
};
