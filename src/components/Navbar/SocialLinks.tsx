import React from "react";
import styled from "styled-components";
import { Link } from "@hackthenorth/north";

import { ScrolledDownProps } from ".";

interface SocialLinksProps extends ScrolledDownProps {
  links: LinkProps[];
  animate?: boolean;
}

interface LinkProps {
  name: string;
  link: string;
  icons: IconTypes;
}

interface IconTypes {
  light: string;
  dark: string;
}

const SocialLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 131px;
  padding-top: 5px;

  ${props => props.theme.mediaQueries.tablet`
    width: 150px;
  `}

  ${props => props.theme.mediaQueries.mobile`
    width: 100px;
  `}
`;

const SocialImg = styled.img`
  width: 20px;
  transition: opacity 250ms ease-in-out;
  &:hover {
    opacity: 0.8;
  }
  ${props => props.theme.mediaQueries.tablet`
    width: 24px;
  `}
  ${props => props.theme.mediaQueries.mobile`
    width: 20px;
  `}
`;

const SocialLink = styled(Link)``;

const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  animate,
  scrolledDown
}) => (
  <SocialLinkContainer>
    {links.map(({ name, link, icons }) => (
      <SocialLink key={name} href={link} newTab>
        <SocialImg
          src={animate || scrolledDown ? icons.light : icons.dark}
          alt={`${name[0]}&#8291;${name.substr(1)}`}
        />
      </SocialLink>
    ))}
  </SocialLinkContainer>
);

export default SocialLinks;
