import styled from "styled-components";

type TypographyProps = {
  color?: string;
};

export const MainTitle = styled.h1<TypographyProps>`
  font-size: 32px;
  color: ${(p) => p.color || "#000"};
`;
