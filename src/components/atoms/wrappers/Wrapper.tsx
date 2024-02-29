import React, { ReactElement } from "react";
import styled from "styled-components";

import Flex, { AlignContent, AlignItems, FlexDirection, FlexWrap, JustifyContent } from "./Flex";

interface WrapperProps extends Flex {
  children?: ReactElement | ReactElement[];
  style?: {
    [key: string]: string;
  };
}

const Wrapper = ({
  children,
  flex = false,
  direction = FlexDirection.ROW,
  wrap = FlexWrap.NOWRAP,
  justify = JustifyContent.START,
  align = AlignItems.STRETCH,
  aligns = AlignContent.START,
  style,
}: WrapperProps) => {
  return (
    <Container
      $flex={flex}
      $direction={direction}
      $wrap={wrap}
      $justify={justify}
      $align={align}
      $aligns={aligns}
      style={style}
    >
      {children}
    </Container>
  );
};

export default React.memo(Wrapper);

type ContainerProps = {
  [key in keyof Omit<WrapperProps, "children"> as `$${key}`]: WrapperProps[key];
};

const Container = styled.div<ContainerProps>`
  display: ${({ $flex }) => ($flex ? "flex" : "")};
  flex-flow: ${({ $direction, $wrap }) => `${$direction} ${$wrap}`};
  justify-content: ${({ $justify }) => $justify};
  align-items: ${({ $align }) => $align};
  align-content: ${({ $aligns }) => $aligns};
`;
