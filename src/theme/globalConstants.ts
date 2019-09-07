import { GlobalConstants } from "@hackthenorth/north";

const globalConstants: GlobalConstants = {
  color: {
    /* Text colours */
    textDark: "#183249",
    textLight: "#EFF8FA",

    /* Accent colours */
    action: "#009DD9",
    actionHover: "#0482b3",
    error: "#FC5430",
    errorHover: "#E54C2B",
    warning: "#FCDB30",
    warningHover: "#FAD307",
    allGood: "#3DEC00",

    /* Primary colours */
    blueL: "#84E1FF",
    blueM: "#43AFDE",
    blueD: "#373F57",

    redL: "#F89797",
    redM: "#E34864",
    redD: "#720C18",

    greenL: "#85EFC3",
    greenM: "#2DAF90",
    greenD: "#0B592F",

    yellowL: "#FFEF99",
    yellowM: "#F6D005",
    yellowD: "#634A0C",

    tanL: "#FCE5D0",
    tanM: "#EABB9D",
    tanD: "#6A3010",

    orangeL: "#FFC684",
    orangeM: "#ED9615",
    orangeD: "#7C4411"
  },
  fontFamily: {
    heading:
      "Castledown, -apple-system, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    text:
      "Inter, -apple-system, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  },
  fontSize: {
    // numbers instead of {n}px to allow us to dynamically resize
    title: 64,
    largeHeading: 48,
    smallHeading: 40,
    heading: 48,
    tabletHeading: 34,
    heroHeadingMobile: 30,
    mobileHeading: 26,
    smallMobileHeading: 28,
    p1: 18,
    p2: 16,
    p3: 14,
    p4: 12,
    link: 16
  },
  borderRadius: {
    button: 50,
    input: 50
  },
  padding: {
    sectionsLarge: 70,
    sectionsMedium: 45,
    sectionsTablet: 25,
    sectionsMobileLarge: 15,
    sectionsMobile: 15,
    sectionsMobileSmall: 10
  },
  width: {
    sectionsLarge: 1440,
    sectionsMedium: 1024,
    sectionsTablet: 768,
    sectionsMobileLarge: 425,
    sectionsMobile: 375,
    sectionsMobileSmall: 320
  }
};

export default globalConstants;
