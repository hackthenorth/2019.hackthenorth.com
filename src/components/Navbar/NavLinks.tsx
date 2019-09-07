import React, { useEffect } from "react";
import styled from "styled-components";
import { Text, UnstyledButton, Link } from "@hackthenorth/north";

interface NavLinkProps {
  sections: string[];
  clickHandler(id: string): void;
  animate?: boolean;
}

const NavLinksContainer = styled.div`
  display: flex;
  width: 370px;
  justify-content: space-between;
  margin-right: 32px;

  ${props => props.theme.mediaQueries.medium`
    width: 400px;
    margin-right: 30px;
  `}

  ${props => props.theme.mediaQueries.tablet`
    flex-direction: column;
    align-items: center;
    height: 375px;
    width: auto;
    margin-right: 0;
    margin-bottom: 40px;
  `}
`;

const Animate = () => `
  &.animate {
    opacity:1;
    transition: all 1250ms cubic-bezier(0.000, 0.995, 0.990, 1.000);

    &:nth-of-type(1) {
      transition-delay: 0s;	
    }
    &:nth-of-type(2) {
      transition-delay: 0.06s;	   
    }
    &:nth-of-type(3) {
      transition-delay: 0.1s;
    }
    &:nth-of-type(4) {
      transition-delay: 0.14s;		
    }
    &:nth-of-type(5) {
      transition-delay: 0.18s;		
    }
  }
`;

const NavLinkButton = styled(UnstyledButton)`
  transition: opacity 250ms ease-in-out;
  &:hover {
    opacity: 0.8;
  }

  ${props => props.theme.mediaQueries.tablet`
    z-index: 20;
    font-size: 32px;
    opacity: 0;
    color: ${props.theme.globalConstants.color.textLight};

    ${Animate()}
  `}
`;

const NavLink = styled(Link)`
  transition: opacity 250ms ease-in-out;
  &:hover {
    opacity: 0.8;
  }

  ${props => props.theme.mediaQueries.tablet`
    z-index: 20;
    font-size: 32px;
    opacity: 0;

    p {
      color: ${props.theme.globalConstants.color.textLight};
    }
    
    &.animate {
      opacity:1;
      transition: all 1250ms cubic-bezier(0.000, 0.995, 0.990, 1.000);
      transition-delay: 0.22s;
    }
  `}
`;

const NavLinks: React.FC<NavLinkProps> = ({
  animate,
  sections,
  clickHandler
}) => {
  useEffect(() => {
    if (animate) {
      const links = Array.from(
        document.getElementsByClassName("mobile-navlink")
      );
      links.forEach(link => {
        link.classList.toggle("animate");
      });
    }
  }, [animate]);

  return (
    <NavLinksContainer>
      {sections.map(section => {
        return section === "2018" ? (
          <NavLink
            key={section}
            href="https://2018.hackthenorth.com"
            variant="navlink"
            className="mobile-navlink"
            newTab
          >
            <Text variant="navlink">{section}</Text>
          </NavLink>
        ) : (
          <NavLinkButton
            key={section}
            onClick={() => clickHandler(section.toLowerCase())}
            className="mobile-navlink"
          >
            <Text variant="navlink">{section}</Text>
          </NavLinkButton>
        );
      })}
    </NavLinksContainer>
  );
};

export default NavLinks;
