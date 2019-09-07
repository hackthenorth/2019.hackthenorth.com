import React from "react";
import styled from "styled-components";

// interface DisplayProps {
//   show: boolean;
// }

const Container = styled.div`
  margin: auto;
  position: relative;
  width: 44px;
  height: 44px;
  padding-left: 4px;

  ${props => props.theme.mediaQueries.medium`
    padding-left: 18px;
  `}
`;

const LoadingRing = styled.div`
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 4px;
  border: 4px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;

  ${props => props.theme.mediaQueries.medium`
    width: 17px;
    height: 17px;
  `}

  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const Loading: React.FC = () => (
  <Container>
    <LoadingRing />
    <LoadingRing />
    <LoadingRing />
    <LoadingRing />
  </Container>
);

export default Loading;
