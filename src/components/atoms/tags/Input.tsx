import React from "react";
import styled from "styled-components";
import { Theme, ThemeType, useTheme } from "../../../core/Theme";

export enum InputType {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
  SEARCH = "search",
  URL = "url",
  TEL = "TEL",
}

interface InputProps {
  value?: string;
  placeholder: string;
  type?: InputType;
  valid?: boolean;
  onChange: (value: string) => void;
}

const Input = ({ value, placeholder, type = InputType.TEXT, valid = true, onChange }: InputProps) => {
  const theme = useTheme((state) => state.theme);

  return (
    <InputContainer
      placeholder={placeholder}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      {...{ value }}
      $valid={valid}
      $theme={theme}
    />
  );
};

export default React.memo(Input);

interface InputContainerProps {
  $valid: boolean;
  $theme: Theme;
}

const InputContainer = styled.input<InputContainerProps>`
  padding: 5px;

  border: 1px solid;
  border-radius: 5px;

  background-color: ${({ $theme }) => $theme.colors.base};
  border-color: ${({ $theme, $valid }) => {
    if ($valid) {
      return $theme.colors.unbase;
    } else {
      return $theme.colors.red;
    }
  }};
  color: ${({ $theme }) => $theme.colors.unbase};

  &::placeholder {
    color: ${({ $theme }) => {
      switch ($theme.type) {
        case ThemeType.LIGHT:
          return "#555555";
        case ThemeType.DARK:
          return "#aaaaaa";
      }
    }};
  }
`;
