import React from "react";
import styled from "styled-components";

interface InputProps {}

const Input = ({}: InputProps) => {
  return <InputContainer />;
};

export default React.memo(Input);

interface InputContainerProps {}

const InputContainer = styled.input<InputContainerProps>``;
