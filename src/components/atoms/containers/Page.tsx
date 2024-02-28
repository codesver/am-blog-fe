import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { Theme, useTheme } from "../../../App";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const Page = ({ className, children, ...props }: PageProps) => {
  const theme = useTheme((state) => state.theme);

  return (
    <PageContainer className={`page ${className}`} $theme={theme} {...props}>
      {children}
    </PageContainer>
  );
};

export default React.memo(Page);

const PageContainer = styled.div<{
  $theme: Theme;
}>`
  width: 100%;
  height: 100%;
  padding: 25px;

  display: flex;
  flex-direction: column;

  background-color: ${({ $theme }) => {
    switch ($theme) {
      case Theme.LIGHT:
        return "#FFFFFF";
      case Theme.DARK:
        return "#191919";
    }
  }};
`;
