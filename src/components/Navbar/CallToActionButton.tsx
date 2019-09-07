import React from "react";
import styled from "styled-components";
import { Text, UnstyledButton } from "@hackthenorth/north";

import { ScrolledDownProps } from ".";

interface CallToActionButtonProps extends ScrolledDownProps {
  text: string;
  onClick: () => void;
}

const CallToAction = styled(UnstyledButton)<ScrolledDownProps>`
  background-color: none;
  border-radius: 999px;
  transition: all 250ms ease;
  border: 2px solid
    ${({ scrolledDown, theme }) =>
      scrolledDown
        ? theme.globalConstants.color.textLight
        : theme.globalConstants.color.textDark};
  height: 40px;
  margin-left: 32px;
  padding: 0 15px;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  ${props => props.theme.mediaQueries.tablet`
    margin-right: 65px;
  `}
`;

const CallToActionContent = styled(Text)`
  white-space: nowrap;
`;

const CallToActionButton = ({
  text,
  onClick,
  scrolledDown
}: CallToActionButtonProps) => (
  <CallToAction variant="navlink" onClick={onClick} scrolledDown={scrolledDown}>
    <CallToActionContent variant="navlink">{text}</CallToActionContent>
  </CallToAction>
);

export default CallToActionButton;
