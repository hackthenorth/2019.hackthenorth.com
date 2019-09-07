/* eslint-disable no-console */
import React from "react";
import styled from "styled-components";
import { Text } from "@hackthenorth/north";

import copy from "copy";
import useWindowWidth from "hooks/useWindowWidth";
import SectionWrapper from "components/SectionWrapper";

import Column from "./Column";

const FAQWrapper = styled(SectionWrapper)`
  padding-top: 26px;
  color: ${({ theme }) => theme.globalConstants.color.textDark};
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

const left = copy.faq.body.filter((question, i) => !(i % 2));
const right = copy.faq.body.filter((question, i) => i % 2);

const FAQ: React.FC = () => {
  const isMobile = useWindowWidth() <= 768;
  return (
    <FAQWrapper id="faq">
      <Text as="h1" variant="sectionHeading">
        {copy.faq.title}
      </Text>
      <Body>
        {isMobile ? (
          <Column questions={copy.faq.body} />
        ) : (
          <>
            <Column questions={left} />
            <Column questions={right} />
          </>
        )}
      </Body>
    </FAQWrapper>
  );
};

export default FAQ;
