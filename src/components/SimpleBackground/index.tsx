import React, { memo, useState } from "react";
import styled from "styled-components";

type SectionName =
  | "about"
  | "stories"
  | "leaders"
  | "sponsors"
  | "faq"
  | "other";

interface BackgroundSections {
  [key: string]: {
    offset: number;
    height: number;
    bg: string;
  };
}

interface BackdropProps {
  section: SectionName;
}

const sections: BackgroundSections = {
  other: {
    offset: 0,
    height: 500,
    bg: "#0000"
  },
  about: {
    offset: 500,
    height: 1400,
    bg: "#2A4A62"
  },
  stories: {
    offset: 1900,
    height: 900,
    bg: "#C46D46"
  },
  leaders: {
    offset: 2800,
    height: 700,
    bg: "#C45E5E"
  },
  sponsors: {
    offset: 3500,
    height: 400,
    bg: "#E8FA"
  },
  faq: {
    offset: 3900,
    height: 400,
    bg: "#Ed8"
  }
};

const Backdrop = styled.div<BackdropProps>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;

  z-index: -1;

  transition: background-color 350ms linear;
  background-color: ${props => sections[props.section].bg};
`;

// const BackgroundLayer = styled.div<BackgroundLayerProps>`
//   position: absolute;
//   top: ${props => `${props.top}px`};
//   width: 100%;
//   height: ${props => `${props.height}px`};
//   opacity: ${props => (props.visible ? 1 : 0)};
//   transition: opacity 300ms ease-in-out;

//   background: ${props => props.background};
// `;

const SimpleBackground = () => {
  const [curSection, updateCurSection] = useState("about" as SectionName);

  window.addEventListener("scroll", () => {
    const windowBottom = window.scrollY;
    if (windowBottom > sections.faq.offset) {
      updateCurSection("faq");
    } else if (windowBottom > sections.sponsors.offset) {
      updateCurSection("sponsors");
    } else if (windowBottom > sections.leaders.offset) {
      updateCurSection("leaders");
    } else if (windowBottom > sections.stories.offset) {
      updateCurSection("stories");
    } else if (windowBottom > sections.about.offset) {
      updateCurSection("about");
    } else {
      updateCurSection("other");
    }
  });

  return <Backdrop section={curSection} />;
};

export default memo(SimpleBackground);
