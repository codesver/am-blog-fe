import React from "react";
import styled from "styled-components";

interface MainProps {
  size: number;
}

const Main = ({ size }: MainProps) => {
  return <MainContainer $size={size} />;
};

export default React.memo(Main);

interface MainContainerProps {
  $size: number;
}

const MainContainer = styled.div<MainContainerProps>`
  width: ${({ $size }) => `${$size}em`};
  height: ${({ $size }) => `${$size}em`};
  background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%);
  animation: spin 3s infinite;

  &::before {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%);
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
  }

  @keyframes spin {
    0% {
      transform: rotate(-45deg);
    }

    50% {
      transform: rotate(-360deg);
      border-radius: 50%;
    }

    100% {
      transform: rotate(-45deg);
    }
  }
`;
