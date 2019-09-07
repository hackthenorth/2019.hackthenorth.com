import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Arrow from "./Arrow";
import { Text, UnstyledButton } from "@hackthenorth/north";
import throttle from "lodash.throttle";

// accepted props of an FAQ item
export interface QuestionItem {
  question: string;
  answer: React.ReactNode;
}

interface CollapsibleAnimationProps {
  height: number; // height of the collapsible
}

export interface CollapsibleProps {
  open: boolean; // whether the collapsible is open
}

interface QuestionSetProps extends QuestionItem {
  shouldOpen: boolean;
  onClick: () => void;
}

const QuestionSetContainer = styled.div`
  margin-bottom: 25px;
`;

const QuestionClickArea = styled(UnstyledButton)`
  text-align: left;
  &:focus {
    opacity: 0.8;
  }
`;

const Collapsible = styled.div<CollapsibleProps & CollapsibleAnimationProps>`
  overflow: hidden;
  transition: height 0.3s ease-out;
  height: ${props => (props.open ? props.height : "0")}px;
`;

const NoWrapContainer = styled.span`
  white-space: nowrap;
`;

const getSplitText = (text: string, shouldOpen: boolean) => {
  const lastSpaceIndex = text.lastIndexOf(" ");
  const wrappableText = text.substring(0, lastSpaceIndex + 1);
  const lastWord = text.substring(lastSpaceIndex);

  return (
    <Text as="h3" variant="boldBody">
      {wrappableText}
      <NoWrapContainer>
        {lastWord}
        <Arrow open={shouldOpen} />
      </NoWrapContainer>
    </Text>
  );
};

const getHeight = (id: string) => {
  const el = document.getElementById(id);
  return el ? el.scrollHeight : 100;
};

const QuestionSet: React.FC<QuestionSetProps> = ({
  question,
  answer,
  shouldOpen,
  onClick
}) => {
  const [height, setHeight] = useState(getHeight(question));

  const throttledSetHeight = throttle(
    () => setHeight(getHeight(question)),
    250
  );

  useEffect(() => {
    setHeight(getHeight(question));
    window.addEventListener("resize", throttledSetHeight);

    return () => {
      window.removeEventListener("resize", throttledSetHeight);
    };
  }, [question, throttledSetHeight]);

  return (
    <QuestionSetContainer>
      <QuestionClickArea onClick={onClick}>
        {getSplitText(question, shouldOpen)}
      </QuestionClickArea>
      <Collapsible id={question} open={shouldOpen} height={height}>
        <Text as="p" variant="sectionText">
          {answer}
        </Text>
      </Collapsible>
    </QuestionSetContainer>
  );
};

export default QuestionSet;
