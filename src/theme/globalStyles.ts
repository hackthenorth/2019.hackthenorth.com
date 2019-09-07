import { createGlobalStyle } from "styled-components";

import FontInterRegularWOFF from "static/fonts/Inter-Regular.woff";
import FontInterRegularWOFF2 from "static/fonts/Inter-Regular.woff2";
import FontInterMediumWOFF from "static/fonts/Inter-Medium.woff";
import FontInterMediumWOFF2 from "static/fonts/Inter-Medium.woff2";
import FontInterBoldWOFF from "static/fonts/Inter-Bold.woff";
import FontInterBoldWOFF2 from "static/fonts/Inter-Bold.woff2";

const globalStyles = createGlobalStyle`
  @font-face {
    font-family: "Inter";
    font-style:  normal;
    font-weight: 400;
    src: url(${FontInterRegularWOFF2}) format("woff2"),
         url(${FontInterRegularWOFF}) format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style:  normal;
    font-weight: 500;
    src: url(${FontInterMediumWOFF2}) format("woff2"),
         url(${FontInterMediumWOFF}) format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style:  normal;
    font-weight: 700;
    src: url(${FontInterBoldWOFF2}) format("woff2"),
         url(${FontInterBoldWOFF}) format("woff");
  }

  html {
    height: 100%;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

export default globalStyles;
