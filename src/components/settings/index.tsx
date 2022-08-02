import { useContext } from "react";
import { PaintContext } from "../../context/paintContext";
import { StyledSettings } from "./styles";

export const SettingsBar = () => {
  const { changeBorderColor, changeBorderSize } = useContext(PaintContext);
  return (
    <StyledSettings>
      <div>
        <label htmlFor="borderSize">Border size</label>
        <input
          type="number"
          id="borderSize"
          name="borderSize"
          defaultValue={1}
          onChange={(e) => changeBorderSize(Number(e.target.value))}
        />
        <label htmlFor="borderColor">Border color</label>
        <input
          type="color"
          id="borderColor"
          name="borderColor"
          onChange={(e) => changeBorderColor(e.target.value)}
        />
      </div>
    </StyledSettings>
  );
};
