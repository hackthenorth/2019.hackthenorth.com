import React, { memo } from "react";
import styled from "styled-components";
import { Text } from "@hackthenorth/north";

import siteCopy from "copy";
import SectionWrapper from "components/SectionWrapper";

import StoryShowcase from "./StoryShowcase";

/* -------------------- Styles -------------------- */
const StoriesWrapper = styled(SectionWrapper)`
  display: flex;
`;

const Content = styled.div`
  display: grid;
  grid-template-areas:
    "heading bubbles"
    "sub bubbles"
    "quote bubbles";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 190px 200px auto;
  grid-column-gap: 60px;
  justify-content: center;

  height: 675px;
  margin: 5% auto;
  color: ${props => props.theme.globalConstants.color.textLight};

  & > .heading {
    grid-area: heading;

    margin: 10px auto;

  }

  & > .sub {
    grid-area: sub;
  }

  & > .bubbles {
    grid-area: bubbles;
    top: 50px;
  }

  & > .quote {
    grid-area: quote;
  }

  ${props => props.theme.mediaQueries.medium`
    grid-template-rows: 190px 200px auto;
  `}

  ${props => props.theme.mediaQueries.tablet`
    grid-template-areas:
      "heading"
      "sub"
      "bubbles"
      "quote";
    grid-template-columns: 100%;
    grid-template-rows: 100px 100px 400px auto;

    height: 1000px;
    max-height: none;


    & > .bubbles {
      top: 0;
    }
  `}

  ${props => props.theme.mediaQueries.tabletMobile`
    grid-template-rows: 110px 170px 500px auto;
    height: 1350px;

    & > .heading {
      align-self: center;
      margin: 0;
    }
  `}

  ${props => props.theme.mediaQueries.mobile`
    grid-template-rows: 110px 180px 500px auto;
    height: 1400px;
  `}

  ${props => props.theme.mediaQueries.smallMobile`
    grid-template-rows: 150px 210px 500px auto;
    height: 1400px;
  `}
`;
const Stories = () => (
  <StoriesWrapper id="stories">
    <Content>
      <Text className="heading" as="h2" variant="sectionHeading">
        {siteCopy.storiesSection.heading}
      </Text>
      <Text className="sub" as="p" variant="sectionText">
        {siteCopy.storiesSection.desc}
      </Text>
      <StoryShowcase />
    </Content>
  </StoriesWrapper>
);

export default memo(Stories);
