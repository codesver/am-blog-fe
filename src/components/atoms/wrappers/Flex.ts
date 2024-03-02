export default interface Flex {
  flex?: boolean;
  direction?: FlexDirection;
  wrap?: FlexWrap;
  justify?: JustifyContent;
  align?: AlignItems;
  aligns?: AlignContent;
}

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
