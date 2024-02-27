import React, { ReactElement } from "react";
import styled from "styled-components";

export enum FlexDirection {
  ROW = "row",
  COLUMN = "column",
}

export enum FlexWrap {
  NOWRAP = "nowrap",
  WRAP = "wrap",
}

export enum JustifyContent {
  START = "flex-start",
  END = "flex-end",
  CENTER = "center",
  BETWEEN = "space-between",
  AROUND = "space-around",
  EVENLY = "space-evenly",
}

export enum AlignItems {
  STRETCH = "stretch",
  START = "flex-start",
  END = "flex-end",
  CENTER = "center",
  BASE = "baseline",
}

export enum AlignContent {
  STRETCH = "stretch",
  START = "flex-start",
  END = "flex-end",
  CENTER = "center",
  BETWEEN = "between",
  AROUND = "around",
  EVENLY = "evenly",
}

interface FlexProps {
  children: ReactElement;
  direction: FlexDirection;
  wrap: FlexWrap;
  justify: JustifyContent;
  align: AlignItems;
  aligns: AlignContent;
}

const Flex = ({
  children,
  direction = FlexDirection.ROW,
  wrap = FlexWrap.NOWRAP,
  justify = JustifyContent.START,
  align = AlignItems.STRETCH,
  aligns = AlignContent.STRETCH,
}: FlexProps) => {
  return (
    <FlexContainer
      direction={direction}
      wrap={wrap}
      justify={justify}
      align={align}
      aligns={aligns}
    >
      {children};
    </FlexContainer>
  );
};

export default React.memo(Flex);

const FlexContainer = styled.div<Omit<FlexProps, "children">>`
  display: flex;
  flex-flow: ${(props) => `${props.direction} ${props.wrap}`};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
`;
