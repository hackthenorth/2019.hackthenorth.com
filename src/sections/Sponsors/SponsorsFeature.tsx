import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { Text, Gallery, Link } from "@hackthenorth/north";

import siteCopy from "copy";

const sponsorsWithFeatures = siteCopy.sponsorsSection.sponsors.filter(
  sponsor => sponsor.feature // keep only those with features
);

const Feature = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: center;

  height: 325px;
  margin: 25px auto;

  ${props => props.theme.mediaQueries.tabletMobile`
    height: 520px;
    flex-direction: column;
  `}
`;

const FeatureImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;

  ${props => props.theme.mediaQueries.tabletMobile`
    height: 90px;
    width: 90%;
    margin: auto;
  `}
`;

const FeatureImg = styled.img`
  margin: auto;
  max-width: 100%;

  ${props => props.theme.mediaQueries.tabletMobile`
    max-height: 90px;
    margin: 20px 0;
  `}
`;

const FeatureGallery = styled(Gallery)`
  height: 100%;
  width: 600px;

  & > .gallery__slider {
    width: 90%;
    margin-bottom: 20px;
  }

  ${props => props.theme.mediaQueries.tabletMobile`
    height: auto;
    width: 100%;
  `}
`;

const GalleryBubbleContainer = styled.div`
  display: flex;
`;

const GalleryBubble = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 440px;
  margin: auto;
  padding: 20px 30px;

  background-color: rgba(243, 243, 243, 0.8);
  color: ${props => props.theme.globalConstants.color.textDark};
  border-radius: 8px;

  &::before {
    content: "";
    box-sizing: border-box;
    display: block;
    position: absolute;
    left: -7px;
    top: 20px;
    width: 14px;
    height: 14px;
    border-top: solid 7px rgba(243, 243, 243, 0.8);
    border-left: solid 7px rgba(243, 243, 243, 0.8);
    border-top-left-radius: 2px;
    border-right: solid 7px transparent;
    border-bottom: solid 7px transparent;
    transform: rotate(-45deg);

    ${props => props.theme.mediaQueries.tabletMobile`
      top: -7px;
      left: 30px;
      transform: rotate(45deg);
    `}
  }

  & > * {
    margin: 10px 0;
  }

  ${props => props.theme.mediaQueries.tablet`
    width: 400px;
  `}

  ${props => props.theme.mediaQueries.tabletMobile`
    top: 10px;
    width: 100%;
  `}
`;

const SponsorsFeature = () => {
  const randomizedSponsors = useMemo(() => {
    // randomize sponsors on mount using Durstenfeld shuffle algorithm.
    let randomizedSponsors = [...sponsorsWithFeatures];
    for (let i = sponsorsWithFeatures.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = sponsorsWithFeatures[i];
      sponsorsWithFeatures[i] = sponsorsWithFeatures[j];
      sponsorsWithFeatures[j] = tmp;
    }

    return randomizedSponsors;
  }, []);
  const randFeatIndex = Math.floor(Math.random() * sponsorsWithFeatures.length);
  const [curFeatureIndex, updateCurFeatureIndex] = useState(randFeatIndex);
  const [interactedWith, updateInteractedWith] = useState(false);

  return (
    <>
      <Text as="h3" variant="subheading">
        Sponsor Showcase
      </Text>
      <Feature onClick={() => updateInteractedWith(true)}>
        <FeatureImgContainer>
          <FeatureImg
            src={randomizedSponsors[curFeatureIndex].imgSrc}
            alt={`Logo of ${randomizedSponsors[curFeatureIndex].name}`}
          />
        </FeatureImgContainer>

        <FeatureGallery
          className="website-feature-gallery"
          startIndex={randFeatIndex}
          showIndicators={randomizedSponsors.length > 1}
          autoScroll={!interactedWith}
          loop
          draggable
          onChange={({ to }) => updateCurFeatureIndex(to)}
        >
          {randomizedSponsors.map(sponsor => (
            <GalleryBubbleContainer
              key={sponsor.name}
              onMouseOver={() => updateInteractedWith(true)}
              onMouseOut={() => updateInteractedWith(false)}
            >
              <GalleryBubble>
                <Text as="p" variant="sectionText">
                  {sponsor.feature && sponsor.feature.text}
                </Text>
                <Link href={sponsor.feature ? sponsor.feature.link : ""} newTab>
                  {sponsor.feature && sponsor.feature.linkLabel}
                </Link>
              </GalleryBubble>
            </GalleryBubbleContainer>
          ))}
        </FeatureGallery>
      </Feature>
    </>
  );
};

export default SponsorsFeature;
