import React, { memo } from "react";
import styled from "styled-components";
import { Text, Button } from "@hackthenorth/north";

import siteCopy from "copy";
import SectionWrapper from "components/SectionWrapper";

import SponsorsFeature from "./SponsorsFeature";
import SponsorsList from "./SponsorsList";

const { sponsorsSection } = siteCopy;

const SponsorsWrapper = styled(SectionWrapper)`
  color: ${({ theme }) => theme.globalConstants.color.textDark};
`;

const MainContent = styled.div`
  display: grid;
  grid-template-areas:
    "heading illustration"
    "desc illustration"
    "cta illustration";
  grid-template-columns: 6fr 4fr;
  grid-column-gap: 50px;

  margin-bottom: 200px;

  & > .heading {	
    grid-area: heading;	
    margin: 0;	
  }

  & > .desc {
    grid-area: desc;
    margin: 20px 0;
  }

  & > .cta {
    grid-area: cta;
  }

  & > .illustration {
    grid-area: illustration;
    justify-self: center;
    align-self: end;

    max-width: 100%;
    max-height: 100%;
  }


  ${props => props.theme.mediaQueries.medium`
    grid-template-columns: 6fr 5fr;

    margin-bottom: 100px;

    & > .illustration {
      align-self: center;
    }
  `}

  ${props => props.theme.mediaQueries.tablet`
    grid-template-areas:
      "illustration"
      "heading"
      "desc"
      "cta";
    grid-template-columns: 100%;
    grid-template-rows: 300px auto auto auto;
    grid-column-gap: 0;

    & > .illustration {
      max-height: 250px;
    }
  `}

  ${props => props.theme.mediaQueries.tabletMobile`
    grid-template-rows: 300px auto auto auto;
  `}

  ${props => props.theme.mediaQueries.tabletMobile`
    grid-template-rows: 250px auto auto auto;
  `}
`;

const SponsorButton = styled(Button)`
  width: 200px;
  padding: 1em;

  border-radius: ${props => props.theme.globalConstants.borderRadius.button}px;
  transition: opacity 250ms ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const Sponsors = () => (
  <SponsorsWrapper id="sponsors-cta">
    <MainContent>
      <Text className="heading" as="h3" variant="sectionHeading">
        {sponsorsSection.heading}
      </Text>
      <div className="desc">{sponsorsSection.desc}</div>

      <img
        className="illustration"
        src={sponsorsSection.illustration}
        alt="Person writing on a whiteboard with a goose peeking out from behind it"
      />
      <SponsorButton
        className="cta"
        onClick={() => window.open(sponsorsSection.cta.link)}
      >
        {sponsorsSection.cta.label}
      </SponsorButton>
    </MainContent>

    <SponsorsFeature />
    <SponsorsList />
  </SponsorsWrapper>
);

export default memo(Sponsors);
