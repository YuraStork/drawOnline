import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ChildrenWrapper = styled.div`
  position: fixed;
  width: 100%;
  background: #0000006f;
  height: 100vh;
  z-index: 9998;
  backdrop-filter: blur(3px);
  top: 0;

  & > div{
    z-index: 9999;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

type Props = {
  children?: ReactNode
}
export const Portal = ({ children = null }: Props) => {
  return createPortal(
    <ChildrenWrapper><div>{children}</div></ChildrenWrapper>,
    document.getElementById("modal") as HTMLDivElement
  );
};
