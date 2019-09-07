import { css } from "styled-components";

const componentStyles = {
  button: {
    sharedStyles: css`
      font-family: ${props => props.theme.globalConstants.fontFamily.text};
      font-size: ${props => props.theme.globalConstants.fontSize.p2}px;

      background-color: ${({ theme }) => theme.globalConstants.color.textDark};
      color: ${props => props.theme.globalConstants.color.textLight};
    `,
    variants: {
      errorRounded: css`
        background-color: ${props => props.theme.globalConstants.color.error};

        &:hover,
        &:focus {
          background-color: ${props => props.theme.globalConstants.color.error};
        }
      `,
      duplicateRounded: css`
        background-color: ${props => props.theme.globalConstants.color.warning};
        &:hover,
        &:focus {
          background-color: ${props =>
            props.theme.globalConstants.color.warningHover};
        }
      `,
      successRounded: css`
        background-color: ${props => props.theme.globalConstants.color.action};
        transition: background-color 0.5s ease;

        &:hover,
        &:focus {
          background-color: ${props =>
            props.theme.globalConstants.color.actionHover};
        }
      `,
      nav: css`
        background-color: transparent;
        &:hover,
        &:focus {
          background-color: transparent;
        }
      `
    }
  },
  text: {
    sharedStyles: css`
      font-family: ${props => props.theme.globalConstants.fontFamily.text};
      color: ${props => props.theme.globalConstants.color.textDark};

      padding: 0;
    `,
    variants: {
      leaderName: css`
        font-family: ${props => props.theme.globalConstants.fontFamily.text};
        font-size: ${props => props.theme.globalConstants.fontSize.p4}px;
        line-height: 18px;
        color: #fff;
        margin-bottom: 0;
      `,
      leaderTitle: css`
        font-family: ${props => props.theme.globalConstants.fontFamily.text};
        font-size: 11px;
        margin-top: 3px;
        color: #fff;
      `,
      headshotText: css`
        font-family: ${props => props.theme.globalConstants.fontFamily.text};
        color: ${props => props.theme.globalConstants.color.textLight};
        font-size: ${props => props.theme.globalConstants.fontSize.p3}px;
        line-height: 20px;
        font-weight: 400;
        margin: 15px;
      `,
      footerText: css`
        font-family: ${props => props.theme.globalConstants.fontFamily.text};
        color: ${props => props.theme.globalConstants.color.textLight};
        font-size: ${props => props.theme.globalConstants.fontSize.p2}px;
        line-height: 24px;
        font-weight: 400;
        margin: 15px;
        text-align: center;
        width: 95vw;
        ${props => props.theme.mediaQueries.tablet`
            font-size: ${props.theme.globalConstants.fontSize.p3}px;
        `}
      `,
      sectionText: css`
        font-family: ${props => props.theme.globalConstants.fontFamily.text};
        font-size: ${props => props.theme.globalConstants.fontSize.p2}px;
        font-weight: 400;
        color: inherit;
        line-height: 24px;
      `,
      sectionHeading: css`
        font-family: ${props => props.theme.globalConstants.fontFamily.heading};
        font-size: ${props => props.theme.globalConstants.fontSize.heading}px;
        color: inherit;
        line-height: 56px;
        margin: 0;
        font-weight: 700;

        ${props => props.theme.mediaQueries.tablet`
          font-size: ${props.theme.globalConstants.fontSize.tabletHeading}px;
          line-height: 44px;
        `}

        ${props => props.theme.mediaQueries.tabletMobile`
          font-size: ${props.theme.globalConstants.fontSize.mobileHeading}px;
          line-height: 38px;
        `}
      `,
      boldBody: css`
        font-size: ${props => props.theme.globalConstants.fontSize.p2}px;
        font-weight: bold;
        line-height: 24px;
        margin: 0;
      `,
      header: css`
        margin: 0 0 -10px 0;
        font-family: ${props => props.theme.globalConstants.fontFamily.heading};
        font-size: ${props => props.theme.globalConstants.fontSize.title}px;
        font-weight: 700;

        ${props => props.theme.mediaQueries.medium`
          font-size: ${props.theme.globalConstants.fontSize.largeHeading}px;
        `}

        ${props => props.theme.mediaQueries.tablet`
          font-size: ${props.theme.globalConstants.fontSize.smallHeading}px;
        `}

        ${props => props.theme.mediaQueries.tabletMobile`
          font-size: ${
            props.theme.globalConstants.fontSize.heroHeadingMobile
          }px;
          line-height: 40px;
          margin-top: 6px;
          text-rendering: optimizeLegibility;
        `}

        ${props => props.theme.mediaQueries.smallMobile`
          font-size: ${
            props.theme.globalConstants.fontSize.smallMobileHeading
          }px;
          line-height: 36px;
          margin-top: 14px;

        `}
      `,
      subheader: css`
        margin-top: 20px;
        font-weight: 400;
        line-height: 24px;

        ${props => props.theme.mediaQueries.medium`
          font-size: ${props.theme.globalConstants.fontSize.p3}px;
          line-height: 20px;
        `}

        ${props => props.theme.mediaQueries.smallMobile`
          font-size: ${props.theme.globalConstants.fontSize.p4}px;
          line-height: 18px;
        `}
      `,
      subheading: css`
        font-family: ${props => props.theme.globalConstants.fontFamily.heading};
        font-size: ${props =>
          props.theme.globalConstants.fontSize.heroHeadingMobile}px;
        font-weight: 600;

        ${props => props.theme.mediaQueries.medium`
          font-size: ${props.theme.globalConstants.fontSize.mobileHeading}px;
          line-height: 20px;
        `}

        ${props => props.theme.mediaQueries.tablet`
          font-size: 20px;
          line-height: 20px;
        `}

        ${props => props.theme.mediaQueries.tabletMobile`
          font-size: ${props.theme.globalConstants.fontSize.p1}px;
          line-height: 18px;
        `}
      `,
      emailAlert: css`
        font-size: ${props => props.theme.globalConstants.fontSize.p3}px;
        line-height: 20px;
        margin-top: 25px;
      `,
      emailAlertFooter: css`
        color: ${props => props.theme.globalConstants.color.textLight};
        font-family: ${props => props.theme.globalConstants.fontFamily.text};
        font-size: ${props => props.theme.globalConstants.fontSize.p3}px;
        margin-top: 25px;
      `,
      warning: css`
        font-size: ${props => props.theme.globalConstants.fontSize.p4}px;
        margin-top: 7px;
        margin-left: 20px;

        ${props => props.theme.mediaQueries.tablet`
            margin-left: 0;
        `}
      `,
      warningFooter: css`
        font-family: ${props => props.theme.globalConstants.fontFamily.text};
        font-size: ${props => props.theme.globalConstants.fontSize.p4}px;
        color: ${props => props.theme.globalConstants.color.textLight};
        margin: 0;
      `,
      navlink: css`
        font-family: ${props => props.theme.globalConstants.fontFamily.text};
        font-size: ${props => props.theme.globalConstants.fontSize.p3}px;
        font-weight: 500;
        margin: 0;
        color: inherit;
      `,
      gearText: css`
        font-family: ${props => props.theme.globalConstants.fontFamily.heading};
        font-size: ${props =>
          props.theme.globalConstants.fontSize.mobileHeading}px;

        ${props => props.theme.mediaQueries.tablet`
          font-size: ${props.theme.globalConstants.fontSize.p1}px;
        `}
        color: ${props => props.theme.globalConstants.color.textLight};
      `
    }
  },
  textInput: {
    sharedStyles: css`
      font-family: ${props => props.theme.globalConstants.fontFamily.text};
      border: 2px solid ${props => props.theme.globalConstants.color.action};
      border-radius: 28px;
      padding: 15px 20px;
      font-size: 14px;
      width: 300px;
      appearance: none;

      &:focus {
        outline: none;
      }

      ${props => props.theme.mediaQueries.medium`
        font-size: 12px;
        padding: 10px 15px;
        width: 250px;
      `}
    `,
    variants: {
      error: css`
        border: 2px solid ${props => props.theme.globalConstants.color.error};
      `,
      duplicate: css`
        border: 2px solid ${props => props.theme.globalConstants.color.warning};
      `
    }
  },
  link: {
    sharedStyles: css`
      font-family: ${props => props.theme.globalConstants.fontFamily.text};
      font-size: ${props => props.theme.globalConstants.fontSize.p2}px;
      color: inherit;

      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }

      @media (hover: none) {
        &:hover {
          text-decoration: underline;
        }
      }
    `,
    variants: {
      navlink: css`
        text-decoration: none;
      `,
      footerLink: css`
        color: ${props => props.theme.globalConstants.color.textLight};
        font-weight: 400;
        margin: 10px;
        text-decoration: none;
        text-align: center;

        &:hover {
          opacity: 0.8;
        }

        ${props => props.theme.mediaQueries.tablet`
            margin: 5px 10px;
            font-size: ${props.theme.globalConstants.fontSize.p3}px;
        `}
      `
    }
  }
};

export default componentStyles;
