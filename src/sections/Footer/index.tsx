import React, { useState } from "react";
import styled from "styled-components";

import MailingListSignup from "components/MailingListSignup";
import InfiniteCarousel from "components/InfiniteCarousel";
import useWindowWidth from "hooks/useWindowWidth";
import { Text, Link } from "@hackthenorth/north";

import FooterBg from "static/img/footer-bg.svg";

import posed, { PoseGroup } from "react-pose";

import copy from "copy";

const Error = posed.div({});

const Wrapper = styled.div`
  background-image: url(${FooterBg});
  background-repeat: no-repeat;
  background-position: center bottom;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 175px 0 50px 0;
  overflow: hidden;
`;

const Image = styled.img`
  height: 61px;
  width: 46px;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 95vw;
`;

const CarouselWrapper = styled.div`
  position: relative;
  margin: 15px -10% 0 -10%;
  & > .carousel {
    width: 95vw;
    height: 70px;

    ${props => props.theme.mediaQueries.tabletMobile`
      width: 100vw;
    `}
  }
  overflow: hidden;
  max-width: 990px;
`;

const HeadshotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  margin: 15px;
`;

const Fade = styled.div`
  pointer-events: none;
  position: absolute;
  height: 70px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
      90deg,
      #373f56,
      rgba(248, 252, 254, 0) 150px
    ),
    linear-gradient(270deg, #373f56, rgba(248, 252, 254, 0) 150px);
  ${props => props.theme.mediaQueries.tabletMobile`
    background-image: none;
  `}
`;

const MailingWrapper = styled.div`
  position: relative;
`;

const Footer = () => {
  const width = useWindowWidth();
  const [organizerText, setOrganizerText] = useState(
    copy.footer.defaultOrganizerText
  );

  const clearOrganizerText = () => {
    setOrganizerText(copy.footer.defaultOrganizerText);
  };

  return (
    <Wrapper>
      <Image alt="" src={copy.footer.img} />
      <Text as="p" variant="footerText">
        {copy.footer.cta}
      </Text>
      <Links>
        {copy.footer.links.map(link => (
          <Link
            key={link.hyperlink}
            variant="footerLink"
            newTab={link.newTab}
            href={link.hyperlink}
          >
            {link.text}
          </Link>
        ))}
      </Links>
      <Social>
        {copy.footer.socials.map(social => (
          <Link
            key={social.link}
            variant="footerLink"
            newTab
            href={social.link}
          >
            <img src={social.img} alt={social.name} />
          </Link>
        ))}
      </Social>
      <MailingWrapper>
        <MailingListSignup footer width={width} />
      </MailingWrapper>
      <HeadshotWrapper>
        <PoseGroup animateOnMount preEnterPose="before">
          <Error key={1}>
            <Text as="p" variant="headshotText">
              {organizerText}
            </Text>
          </Error>
        </PoseGroup>
        <CarouselWrapper>
          <InfiniteCarousel
            itemWidth={90}
            setOrganizerText={setOrganizerText}
            items={copy.footer.team}
            clearOrganizerText={clearOrganizerText}
          />
          <Fade />
        </CarouselWrapper>
      </HeadshotWrapper>
    </Wrapper>
  );
};

export default Footer;
