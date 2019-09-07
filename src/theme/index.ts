import { Theme, MediaQueryTemplates } from "@hackthenorth/north";

import componentStyles from "./componentStyles";
import globalStyles from "./globalStyles";
import globalConstants from "./globalConstants";

/**
 * This merges our theme's interface with the default theme interface
 * and other declarations in styled-components, which provides
 * correct typing for the theme object in styled-components' ThemeProvider
 * (see https://www.styled-components.com/docs/api#typescript)
 */
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {
    globalConstants: {
      color: {
        textDark: string;
        textLight: string;
        action: string;
        actionHover: string;
        error: string;
        errorHover: string;
        warning: string;
        warningHover: string;
        allGood: string;
        blueL: string;
        blueM: string;
        blueD: string;
        redL: string;
        redM: string;
        redD: string;
        greenL: string;
        greenM: string;
        greenD: string;

        yellowL: string;
        yellowM: string;
        yellowD: string;

        tanL: string;
        tanM: string;
        tanD: string;

        orangeL: string;
        orangeM: string;
        orangeD: string;
      };
      fontFamily: {
        heading: string;
        text: string;
      };
      fontSize: {
        title: number;
        heading: number;
        largeHeading: number;
        mobileHeading: number;
        tabletHeading: number;
        heroHeadingMobile: number;
        smallHeading: number;
        smallMobileHeading: number;
        p1: number;
        p2: number;
        p3: number;
        p4: number;
        link: number;
      };
      borderRadius: {
        button: number;
        input: number;
      };
      padding: {
        sectionsLarge: number;
        sectionsMedium: number;
        sectionsTablet: number;
        sectionsTabletMobile: number;
        sectionsMobile: number;
        sectionsSmallMobile: number;
      };
      width: {
        sectionsLarge: number;
        sectionsMedium: number;
        sectionsTablet: number;
        sectionsTabletMobile: number;
        sectionsMobile: number;
        sectionsSmallMobile: number;
      };
    };
    mediaQueries: MediaQueryTemplates;
  }
}

const themeDef = {
  ...componentStyles,
  globalStyles,
  globalConstants,
  deviceBreakpoints: {
    // don't need one for ultrawide, those styles will be base styles
    large: 1440,
    medium: 1024,
    tablet: 768,
    tabletMobile: 425,
    mobile: 375,
    smallMobile: 320
  }
};

export default themeDef;
