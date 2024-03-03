import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import useTheme, { Theme } from "../../core/Theme";

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

interface PageContainerProps {
  $theme: Theme;
}

const PageContainer = styled.div<PageContainerProps>`
  width: 100%;
  height: 100%;
  padding: 25px;

  display: flex;
  flex-direction: column;

  background-color: ${({ $theme }) => $theme.colors.base};
`;
