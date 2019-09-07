import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text } from "@hackthenorth/north";
import { useTransition, animated, config } from "react-spring";
import { fadeIn, fadeOut } from "animations/fades";

export interface GearConfigProps {
  x: ResponsiveProps; // x coordinate of the gear
  y: ResponsiveProps; // y coordinate of the gear
  h: ResponsiveProps; // height of the image
  id: string; // id of the gear
}

interface GearTextProps {
  show: boolean;
}

// accepted props of each `Gear` component
interface GearProps {
  gearConfigs: GearConfigProps; // position and size values of the gear
  text: string; // on hover text string of the gear
  images: { id: string; url: string }[]; // array of slideshow images
  delay: number; // how long until the first transition of the slideshow
  gradient: { id: string; url: string }; // on hover background image
}

export interface ResponsiveProps {
  large: number;
  medium: number;
  mobile: number;
}

const GearContainer = styled.div<GearConfigProps>`
  position: absolute;
  left: ${props => props.x.large}px;
  top: ${props => props.y.large}px;
  width: ${props => props.h.large}px;
  height: ${props => props.h.large}px;

  ${props => props.theme.mediaQueries.medium`
    left: ${props.x.medium}px;
    top: ${props.y.medium}px;
    width: ${props.h.medium}px;
    height: ${props.h.medium}px;
  `}

  ${props => props.theme.mediaQueries.tablet`
    left: ${props.x.mobile}px;
    top: ${props.y.mobile}px;
    width: ${props.h.mobile}px;
    height: ${props.h.mobile}px;
  `}
`;

const GearTextContainer = styled.div<GearTextProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  visibility: ${props => (props.show ? "visible" : "hidden")};
  animation: ${props => (props.show ? fadeIn : fadeOut)} 0.5s linear;
  transition: visibility 0.5s linear;
  z-index: 6;

  & > {
    max-width: 70%;
  }
`;

const animationPeriod = 8000;

const Gear: React.FC<GearProps> = ({
  gearConfigs,
  images,
  text,
  delay,
  gradient
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const imageTransitions = useTransition(images[imageIndex], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses
  });

  const textTransitions = useTransition(hovered, null, {
    from: { opacity: 0 },
    enter: { opacity: 0.9 },
    leave: { opacity: 0 },
    config: config.molasses
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timer: NodeJS.Timeout;

    // trigger the slideshow interval
    const startInterval = () =>
      setInterval(
        () => setImageIndex(index => (index + 1) % 4),
        animationPeriod
      );

    // set delay before triggering the slideshow interval
    timer = setTimeout(() => {
      setImageIndex(index => (index + 1) % 4);
      interval = startInterval();
    }, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <GearContainer
      {...gearConfigs}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <GearTextContainer show={hovered}>
          <Text variant="gearText">{text}</Text>
        </GearTextContainer>
      )}
      {textTransitions.map(
        ({ item, props, key }) =>
          item && (
            <animated.div
              key={key}
              style={{
                ...props,
                backgroundImage: `url(${gradient.url})`,
                width: "inherit",
                height: "inherit",
                position: "absolute",
                top: 0,
                left: 0,
                willChange: "opacity",
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 5
              }}
            />
          )
      )}
      {imageTransitions.map(({ item, props, key }) => (
        <animated.div
          key={key}
          style={{
            ...props,
            backgroundImage: `url(${item.url})`,
            width: "inherit",
            height: "inherit",
            position: "absolute",
            top: 0,
            left: 0,
            willChange: "opacity",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
      ))}
    </GearContainer>
  );
};

export default Gear;
