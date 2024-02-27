import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const Page = ({ className, children, ...props }: PageProps) => {
  return (
    <PageContainer className={`page ${className}`} {...props}>
      {children}
    </PageContainer>
  );
};

export default React.memo(Page);

const PageContainer = styled.div`
  width: 100%;
  height: 100%;

  padding: 25px;

  display: flex;
  flex-direction: column;
`;
