import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import Arrow from "static/img/hero/arrow.svg";
import { Text, TextInput, Button, Loader } from "@hackthenorth/north";
import globalConstants from "theme/globalConstants";
import posed, { PoseGroup } from "react-pose";

import siteCopy from "copy";
import Loading from "./Loading";

// Augment window to include HackerAPI definition
declare global {
  interface Window {
    // eslint-disable-next-line
    HackerAPI: any;
  }
}

const validateEmailAddress = (email: string) => {
  const emailPrefix = "[A-Z0-9a-z]([A-Z0-9a-z._%+-]{0,30}[A-Z0-9a-z])?";
  const emailServer = "([A-Z0-9a-z]([A-Z0-9a-z-]{0,30}[A-Z0-9a-z])?\\.){1,5}";
  const emailRegEx = `${emailPrefix}@${emailServer}[A-Za-z]{2,6}`;
  return email.match(emailRegEx);
};

enum SignUpState {
  Duplicate = "DUPLICATE",
  Error = "ERROR",
  Submitting = "SUBMITTING"
}

const Success = posed.div({
  before: { y: "75%" },
  enter: { y: "0%" }
});

const Error = posed.div({
  before: { y: "40%" },
  enter: { y: "0%" }
});

interface FooterProps {
  footer?: boolean;
}

const PoseWrapper = styled.div<FooterProps>`
  position: ${props => (props.footer ? null : "absolute")};
  ${props =>
    props.footer
      ? `
    text-align: center;
    width: 100%;
    position: absolute;
    margin: auto;`
      : null}

  ${props => props.theme.mediaQueries.tablet`
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
  `}

  ${props => props.theme.mediaQueries.tabletMobile`
    display: flex;
    justify-content: center;
    width: 100%;
  `}
`;

const EmailForm = styled.form<FooterProps>`
  display: flex;
  align-items: center;
  margin: ${props => (props.footer ? "15px" : "25px 0 0 0")};

  ${props => props.theme.mediaQueries.medium`
    margin-top: 15px;
  `}
  ${props => props.theme.mediaQueries.tablet`
    justify-content: center;
  `}

  ${props => props.theme.mediaQueries.tabletMobile`
    margin-top: 20px;
    width: 100vw;
    justify-content: center;
    ${props.footer ? "null" : "margin-left: -15px"};
  `}
`;

const SignupButton = styled(Button)`
  display: flex;
  position: absolute;
  margin-left: 296px;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #fff;

  ${props => props.theme.mediaQueries.medium`
    margin-left: 250px;
    width: 25px;
    height: 25px;
  `}
  ${props => props.theme.mediaQueries.tablet`
    margin-left: 120px;
  `}
  ${props => props.theme.mediaQueries.tabletMobile`
    margin-left: 123px;
  `}
`;

const Image = styled.img<{ show: boolean }>`
  width: 20px;

  display: ${props => (props.show ? "inline-block" : "none")};

  ${props => props.theme.mediaQueries.medium`
    width: 15px;
  `}
`;

interface MailingListSignUpProps {
  width: number;
  footer?: boolean;
}

const MailingListSignUp = (props: MailingListSignUpProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [signUpState, updateSignUpState] = useState("");

  const { HackerAPI } = window;

  const signupForMailingList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "") {
      return;
    }

    if (validateEmailAddress(email)) {
      updateSignUpState(SignUpState["Submitting"]);
      HackerAPI.Event.MailingListSignup.create(
        new HackerAPI.Event({ slug: "hackthenorth2019" }),
        new HackerAPI.Event.MailingListSignup({ email })
      )
        .then((data: { email: string; alreadySignedUp: boolean }) => {
          if (data && "email" in data) {
            if (data.alreadySignedUp) {
              updateSignUpState(SignUpState["Duplicate"]);
            } else {
              setSubmitted(true);
            }
          } else {
            updateSignUpState(SignUpState["Error"]);
          }
        })
        .catch(() => {
          // request error
          updateSignUpState(SignUpState["Error"]);
        });
    } else {
      // email validation failed
      updateSignUpState(SignUpState["Error"]);
    }
  };

  const handleChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.value === "") {
      updateSignUpState("");
    }
    setEmail(target.value);
  };

  let color;
  if (globalConstants.color) {
    color = props.footer
      ? globalConstants.color.textLight
      : globalConstants.color.textDark;
  }

  // This is very hacky, doesn't use a styled component and thus can't access props
  // I need to figure out this reredering bug before shipping.
  const textStyle = {
    color: `${color}`,
    fontFamily: `${
      globalConstants.fontFamily ? globalConstants.fontFamily.text : "Inter"
    }`,
    fontSize: `${props.width <= 320 ? "12px" : "14px"}`,
    fontWeight: 400,
    margin: `${props.width <= 768 ? "15px auto 0 auto" : "25px 0 0 0"}`,
    paddingBottom: `${props.width <= 768 ? "0px" : "17px"}`,
    width: `${props.width <= 768 ? null : "380px"}`
  };
  const textStyleFooter = {
    textAlign: "center" as "center",
    color: `${color}`,
    fontFamily: `${
      globalConstants.fontFamily ? globalConstants.fontFamily.text : "Inter"
    }`,
    fontSize: `${props.width <= 320 ? "12px" : "14px"}`,
    fontWeight: 400,
    marginTop: "25px",
    paddingBottom: `${props.width <= 768 ? "0px" : "34px"}`,
    width: `${props.width <= 768 ? "300px" : "450px"}`
  };

  const textBoldStyle = {
    fontWeight: 700
  };

  let buttonVariant;
  switch (signUpState) {
    case SignUpState["Error"]:
      buttonVariant = "error";
      break;
    case SignUpState["Duplicate"]:
      buttonVariant = "duplicate";
      break;
    default:
      buttonVariant = "success";
  }

  return submitted ? (
    <PoseGroup animateOnMount preEnterPose="before">
      <Success key={1}>
        <h1 style={props.footer ? textStyleFooter : textStyle}>
          <span style={textBoldStyle}>{email} </span> {siteCopy.hero.emailNotif}
        </h1>
      </Success>
    </PoseGroup>
  ) : (
    <>
      <EmailForm footer={props.footer} onSubmit={signupForMailingList}>
        <TextInput
          placeholder={siteCopy.hero.emailPlaceholder}
          onChange={handleChange}
          value={email}
          type="email"
          required
          variant={buttonVariant}
          label={siteCopy.hero.emailPlaceholder}
        />
        <SignupButton
          variant={`${buttonVariant}Rounded`}
          onClick={() => null}
          disabled={signUpState === "SUBMITTING"}
        >
          <Loader loading={signUpState === "SUBMITTING"} render={Loading} />
          <Image src={Arrow} alt="arrow" show={signUpState !== "SUBMITTING"} />
        </SignupButton>
      </EmailForm>
      {buttonVariant === "duplicate" || buttonVariant === "error" ? (
        <PoseWrapper footer={props.footer}>
          <PoseGroup animateOnMount preEnterPose="before">
            <Error key={2}>
              <Text as="p" variant={props.footer ? "warningFooter" : "warning"}>
                {buttonVariant === "duplicate"
                  ? siteCopy.hero.emailDupe
                  : siteCopy.hero.emailError}
              </Text>
            </Error>
          </PoseGroup>
        </PoseWrapper>
      ) : null}
    </>
  );
};

export default MailingListSignUp;
