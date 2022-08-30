import { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { FunctionWithParams } from "types";

const InputWrapper = styled.div``;
const Wrapper = styled.div`
  width: max-content;
`;
const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ span {
    background-color: #2196f3;
  }
  &:checked ~ span:after {
    display: block;
  }
`;

const Span = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;

  &:after {
    content: "";
    position: absolute;
    display: none;
  }

  &:after {
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
`;

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

type RadioButtonTypes = {
  defaultValue: string;
  values: string[];
  name: string;
  onChange: FunctionWithParams<ChangeEvent<HTMLInputElement>>;
};

export const RadioButtons: FC<RadioButtonTypes> = ({
  defaultValue,
  name,
  onChange,
  values,
}) => {
  return (
    <InputWrapper>
      {values.map((value) => (
        <Wrapper key={`${value}_${Math.floor(Math.random() * 100)}`}>
          <Label htmlFor={`radio_color_${value}`}>
            {value}
            <Input
              type="radio"
              id={`radio_color_${value}`}
              name={name}
              value={value}
              defaultChecked={value === defaultValue}
              onChange={onChange}
            />
            <Span />
          </Label>
        </Wrapper>
      ))}
    </InputWrapper>
  );
};
