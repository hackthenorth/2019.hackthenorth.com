import React from "react";
import styled from "styled-components";
import { Button } from "@hackthenorth/north";

import { ScrolledDownProps } from ".";

interface OpenState extends ScrolledDownProps {
  isOpen: boolean;
  scrolledDown: boolean;
}

interface CloseIconProps extends OpenState {
  open(e: React.MouseEvent<HTMLElement>): void;
  close(e: React.MouseEvent<HTMLElement>): void;
}

const MenuContainer = styled(Button)`
  position: absolute;
  right: 24px;
  z-index: 12;
  cursor: pointer;
  width: 33px;
  height: 21px;

  ${props => props.theme.mediaQueries.tablet`
    right: 33px;
  `}
`;

const HamburgerLine = styled.div<OpenState>`
  position: absolute;
  margin: auto;
  top: 0px;
  background: ${({ isOpen, scrolledDown, theme }) =>
    isOpen || scrolledDown
      ? theme.globalConstants.color.textLight
      : theme.globalConstants.color.textDark};
  height: 3px;
  width: 33px;
  transition: all 400ms ease-out;

  &.collapse {
    top: 10px;
    transition: all 70ms ease-out;
  }
  &.rotate30 {
    transform: rotate(30deg);
    transition: all 50ms ease-out;
  }
  &.rotate150 {
    transform: rotate(150deg);
    transition: all 50ms ease-out;
  }

  &.rotate45 {
    transform: rotate(45deg);
    transition: all 100ms ease-out;
  }
  &.rotate135 {
    transform: rotate(135deg);
    transition: all 100ms ease-out;
  }
  &.hide {
    display: none;
  }
`;

const Line1 = styled(HamburgerLine)`
  top: 0;
`;

const Line2 = styled(HamburgerLine)`
  top: 9px;
`;

const Line3 = styled(HamburgerLine)`
  top: 18px;
`;

const MenuIcon: React.FC<CloseIconProps> = ({
  isOpen,
  scrolledDown,
  open,
  close
}) => {
  return (
    <MenuContainer
      onClick={e => {
        isOpen ? close(e) : open(e);
      }}
      variant="nav"
    >
      <Line1 isOpen={isOpen} scrolledDown={scrolledDown} className="line x" />
      <Line2 isOpen={isOpen} scrolledDown={scrolledDown} className="line y" />
      <Line3 isOpen={isOpen} scrolledDown={scrolledDown} className="line z" />
    </MenuContainer>
  );
};

export default React.memo(MenuIcon);
