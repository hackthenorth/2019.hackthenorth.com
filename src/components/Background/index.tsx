import React, { memo } from "react";

import BackgroundLayer from "./BackgroundLayer";

type SectionName =
  | "about"
  | "stories"
  | "leaders"
  | "sponsors-cta"
  | "faq"
  | "other";

interface BackgroundSection {
  name: SectionName;
  bg: string;
}

const sections: BackgroundSection[] = [
  // MUST BE DEFINED BOTTOM OF PAGE FIRST FOR STACKING
  {
    name: "faq",
    bg: "#EFF8FA"
  },
  {
    name: "sponsors-cta",
    bg: "#EFF8FA"
  },
  {
    name: "leaders",
    bg: "linear-gradient(180deg, #B77554 0%, #C45E5E 98.96%)"
  },
  {
    name: "stories",
    bg: "linear-gradient(180deg, #C46D46 0%, #A47243 98.96%)"
  },
  {
    name: "about",
    bg:
      "linear-gradient(180deg, #314158 18.52%, #2A4A62 36.85%, #345F6C 55.55%, #256477 72.76%, #287795 89.59%, #287795 89.6%)"
  }
];

const Background = () => (
  <>
    {sections.map((section, i) => (
      <BackgroundLayer
        key={section.name}
        first={i === sections.length - 1}
        {...section}
      />
    ))}
  </>
);

export default memo(Background);
