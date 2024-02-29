import React from "react";
import styled from "styled-components";
import useTheme, { Theme } from "../../../core/Theme";

export enum ButtonType {
  NORMAL,
  PRIMARY,
  ERROR,
}

interface ButtonProps {
  text: string;
  type: ButtonType;
  onClick: () => void;
}

const Button = ({ text, type = ButtonType.NORMAL, onClick }: ButtonProps) => {
  const theme = useTheme((state) => state.theme);

  return (
    <ButtonContainer className="button" type="button" onClick={onClick} $type={type} $theme={theme}>
      {text}
    </ButtonContainer>
  );
};

export default React.memo(Button);

type ButtonContainerProps = {
  [key in keyof Pick<ButtonProps, "type"> as `$${key}`]: ButtonProps[key];
} & {
  $theme: Theme;
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 5px;

  border: 1px solid;
  border-radius: 5px;

  background-color: ${({ $theme }) => $theme.colors.base};
  color: ${({ $theme, $type }) => {
    switch ($type) {
      case ButtonType.NORMAL:
        return $theme.colors.unbase;
      case ButtonType.PRIMARY:
        return $theme.colors.blue;
      case ButtonType.ERROR:
        return $theme.colors.red;
    }
  }};

  font-family: "NanumSquareRound";
  font-weight: 700;

  transition: ease-in-out 0.1s;

  &:hover {
    transform: translateX(-1px) translateY(-1px);
    box-shadow: 0.5px 0.5px 0.5px 0.5px;
  }
`;
