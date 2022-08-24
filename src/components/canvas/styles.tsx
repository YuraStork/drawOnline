import styled from "styled-components";

const CanvasWrapper = styled.div`
  grid-area: canvas;
  background: #ffffff;
  border-right: 2px solid #000; 
  & > canvas {
    background: #ffffff;
  }
`;

export { CanvasWrapper };
