import styled from "styled-components";

const CanvasWrapper = styled.div`
  grid-area: canvas;
  padding: 10px 5px;
  box-shadow: 0px 2px 5px 1px #b7bebe;
  & > canvas {
    background: #ececec;
  }
`;

export { CanvasWrapper };
