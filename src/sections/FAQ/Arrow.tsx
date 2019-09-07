import React from "react";
import styled, { keyframes } from "styled-components";

import { CollapsibleProps } from "./QuestionSet";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(180deg); }
`;

const spinReverse = keyframes`
  from { transform: rotate(180deg); }
  to { transform: rotate(0deg); }
`;

const ArrowContainer = styled.div<CollapsibleProps>`
  display: inline-block;
  margin-left: 5px;

  svg {
    position: relative;
    top: -2px;
    animation: ${props => (props.open ? spinReverse : spin)} 0.3s linear
      forwards;
  }
`;

const Arrow: React.FC<CollapsibleProps> = ({ open }) => (
  <ArrowContainer open={open}>
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.24407 0.872872C4.64284 0.41241 5.35716 0.41241 5.75593 0.872872L8.76318 4.34535C9.32406 4.99299 8.864 6 8.00725 6L1.99275 6C1.136 6 0.675944 4.99299 1.23682 4.34535L4.24407 0.872872Z"
        fill="#009DD9"
      />
    </svg>
  </ArrowContainer>
);

export default Arrow;
