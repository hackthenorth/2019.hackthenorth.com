import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "@hackthenorth/north";

import copy from "copy";
import SectionWrapper from "components/SectionWrapper";
import VideoModal from "components/VideoModal";

import Gear, { GearConfigProps } from "./Gear";
import RecapVideoButton from "./VideoButton";

const aboutCopy = copy.about;

const AboutWrapper = styled(SectionWrapper)`
  padding-top: 150px;
  padding-bottom: 50px;
`;

const AboutTextWrapper = styled.div`
  max-width: 581px;
  width: 50%;

  p,
  h1 {
    color: ${props => props.theme.globalConstants.color.textLight} !important;
  }

  ${props => props.theme.mediaQueries.medium`
    width: 60%;
  `}

  ${props => props.theme.mediaQueries.tablet`
    width: 100%;
  `}
`;

const GearsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 40%;

  ${props => props.theme.mediaQueries.medium`
    top: 432px;
    left: 315px;
  `}

  ${props => props.theme.mediaQueries.tablet`
    top: 600px;
    left: 60%;
  `}

  ${props => props.theme.mediaQueries.tabletMobile`
    top: 600px;
    left: 275px;
  `}

  ${props => props.theme.mediaQueries.mobile`
    top: 600px;
    left: 240px;
  `}
`;

const EngineeringWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 715px;

  ${props => props.theme.mediaQueries.medium`
    margin-top: 961px;
    flex-direction: column;
  `}

  ${props => props.theme.mediaQueries.tablet`
    margin-top: 1050px;
  `}

  ${props => props.theme.mediaQueries.mobile`
    margin-top: 900px;
  `}
`;

const EngineeringIllustration = styled.img`
  height: 186px;
  margin-right: 60.7px;
  ${props => props.theme.mediaQueries.medium`
    margin-bottom: 85px;
  `}
  ${props => props.theme.mediaQueries.mobile`
    height: 125px;
    margin-right: 0;
  `}
`;

const EngineeringLogo = styled.img`
  height: 22.5px;
  ${props => props.theme.mediaQueries.mobile`
    height: 21.5px;
  `}
`;

const EngineeringText = styled.div`
  max-width: 579px;

  p {
    color: ${props => props.theme.globalConstants.color.textLight} !important;
  }
`;

const getResponsiveObject = (
  large: number,
  medium: number,
  mobile: number
) => ({
  large,
  medium,
  mobile
});

const gearConfigs: GearConfigProps[] = [
  {
    x: getResponsiveObject(135, 85, -110),
    y: getResponsiveObject(0, 0, 0),
    h: getResponsiveObject(430, 380, 270),
    id: "gear1"
  },
  {
    x: getResponsiveObject(360, 37, -157),
    y: getResponsiveObject(354, 523, 400),
    h: getResponsiveObject(420, 370, 260),
    id: "gear2"
  },
  {
    x: getResponsiveObject(0, -189, -300),
    y: getResponsiveObject(475, 246, 171),
    h: getResponsiveObject(387, 350, 250),
    id: "gear3"
  },
  {
    x: getResponsiveObject(-219, -282, -286),
    y: getResponsiveObject(746, 565, 600),
    h: getResponsiveObject(291, 265, 190),
    id: "gear4"
  }
];

const AboutTextBlock = (
  <AboutTextWrapper>
    <Text as="h1" variant="sectionHeading">
      {aboutCopy.title}
    </Text>
    <Text as="p" variant="subheader">
      {aboutCopy.sentence1}
    </Text>
    <Text as="p" variant="subheader">
      {aboutCopy.sentence2}
    </Text>
  </AboutTextWrapper>
);

const Engineering = () => (
  <EngineeringWrapper>
    <EngineeringIllustration
      src={aboutCopy.engineering.illustration}
      alt="engineering-illustration"
    />
    <EngineeringText>
      <EngineeringLogo
        src={aboutCopy.engineering.logo}
        alt="engineering-logo"
      />
      <Text as="p" variant="subheader">
        {aboutCopy.engineering.text}
      </Text>
    </EngineeringText>
  </EngineeringWrapper>
);

const About: React.FC = () => {
  const [isVideoOpen, toggleVideo] = useState(false);
  // for potential video props
  const videoOptions = {
    url: aboutCopy.video.url
  };
  return (
    <AboutWrapper id="about">
      {AboutTextBlock}
      <RecapVideoButton
        icon={aboutCopy.videoButton.icon}
        text={aboutCopy.videoButton.text}
        background={aboutCopy.videoButton.background}
        toggleVideo={() => toggleVideo(true)}
      />
      {isVideoOpen && (
        <VideoModal
          isVideoOpen={isVideoOpen}
          onClose={() => toggleVideo(false)}
          closeIcon={aboutCopy.video.closeIcon}
          videoOptions={videoOptions}
        />
      )}
      {Engineering()}
      <GearsWrapper>
        {aboutCopy.gears.map(({ name, body, images, delay, gradient }, i) => (
          <Gear
            gearConfigs={gearConfigs[i]}
            key={name}
            gradient={gradient}
            text={body}
            delay={delay}
            images={images}
          />
        ))}
      </GearsWrapper>
    </AboutWrapper>
  );
};

export default About;
