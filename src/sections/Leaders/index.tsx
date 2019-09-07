import React from "react";
import styled from "styled-components";
import copy from "copy";
import { Carousel, Text } from "@hackthenorth/north";

import SectionWrapper from "components/SectionWrapper";

const leaders = [...copy.leaders.leaders, ...copy.leaders.leaders];

const LeadersWrapper = styled(SectionWrapper)`
  display: flex;
  color: ${props => props.theme.globalConstants.color.textLight};
  padding: 50px auto;

  ${props => props.theme.mediaQueries.tabletMobile`
    width: 100%;
    padding: 0;
  `}
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "heading illustration"
    "desc illustration"
    "carousel carousel";
  grid-template-columns: 6fr 3fr;
  column-gap: 100px;

  margin: auto;

  & > .heading {
    grid-area: heading;
    align-self: end;
    margin: 0;
    margin-bottom: 20px;

    ${props => props.theme.mediaQueries.tabletMobile`
      margin-bottom: 10px;
    `}
  }
  & > .desc {
    grid-area: desc;
    align-self: start;
  }
  & > .illustration {
    grid-area: illustration;
    justify-self: end;
    align-self: center;
    max-width: 100%;
    max-height: 100%;
  }

  ${props => props.theme.mediaQueries.tablet`
    grid-template-areas:
      "illustration"
      "heading"
      "desc"
      "carousel";
    grid-template-columns: 100%;
    grid-template-rows: 300px auto auto auto;
    grid-column-gap: 0;

    & > .illustration {
      max-height: 250px;
      justify-self: center;
    }
  `}

  ${props => props.theme.mediaQueries.tabletMobile`
    & > .illustration, & > .desc, & > .heading {
      padding: 0 ${props.theme.globalConstants.padding.sectionsTablet}px;
    }
  `}
`;

const Image = styled.img`
  height: 125px;
  width: 125px;
  border-radius: 50%;
`;

const LeaderBubbleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 75px;
  text-align: center;
`;

const CarouselWrapper = styled.div`
  grid-area: carousel;
  position: relative;
  margin: 50px 0% 0 0%;

  mask-image: linear-gradient(
    to right,
    transparent,
    black,
    black,
    black,
    black,
    black,
    transparent
  );

  & > .carousel {
    max-width: 100%;
    width: 100%;
    height: 200px;

    ${props => props.theme.mediaQueries.tabletMobile`
    mask-image: none;
  `}
  }

  ${props => props.theme.mediaQueries.tablet`
    mask-image: linear-gradient(
      to right,
      transparent,
      black,
      black,
      black,
      black,
    black,
    black,
      transparent
    );
  `}

  ${props => props.theme.mediaQueries.tabletMobile`
    mask-image: none;
  `}
`;

const getImages = () =>
  leaders.map((leader, i) => (
    <LeaderBubbleWrapper key={`${leader.name}${i}`}>
      <Image src={leader.img} alt={leader.name} />
      <Text as="p" variant="leaderName">
        {leader.name}
      </Text>
      <Text as="p" variant="leaderTitle">
        {leader.title}
      </Text>
    </LeaderBubbleWrapper>
  ));

const Leaders = () => (
  <LeadersWrapper id="leaders">
    <Wrapper>
      <Text className="heading" as="h3" variant="sectionHeading">
        {copy.leaders.title}
      </Text>
      {copy.leaders.desc}
      <img
        className="illustration"
        src={copy.leaders.img}
        alt="Lightbulb that is an air ballon with two people looking outwards"
      />
      <CarouselWrapper>
        <Carousel className="carousel" itemWidth={125} duration={50}>
          {getImages()}
        </Carousel>
      </CarouselWrapper>
    </Wrapper>
  </LeadersWrapper>
);

export default Leaders;
