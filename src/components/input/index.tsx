import { FC, useState } from "react";
import { InputWrapper, ErrorSpan } from "./styles";

type InputProps = {
  margin?: string;
  type: string;
  label: string;
  value: any;
  name: string;
  error?: string;
  id?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  disabled?: boolean
};

export const Input: FC<InputProps> = ({ label, ...rest }) => {
  const [type] = useState(rest.type || "text");
  return (
    <InputWrapper
      isError={!!rest.error}
      hasValue={!!rest.value}
      margin={rest.margin}
    >
      <input {...rest} type={type} />
      <label>{label}</label>
      {!!rest.error && <ErrorSpan title={rest.error}></ErrorSpan>}
    </InputWrapper>
  );
};
