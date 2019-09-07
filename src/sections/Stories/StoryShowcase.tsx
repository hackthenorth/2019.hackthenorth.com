import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Text, Link } from "@hackthenorth/north";
import CrossfadeImage from "react-crossfade-image";

import siteCopy from "copy";

/* -------------------- Typescript definitions -------------------- */
interface StoryBubbleProps {
  bubblePosIndex: number; // index in bubblePositions of the bubble
}

interface StoryBubbleImgProps {
  shouldHide: boolean; // whether the bubble is changing or not
  imgSrc: string; // URI pointing to location of the image
}

interface StoryBubbleStatus {
  state: "READY" | "CHANGING";
  from?: number; // when state is changing, the index of the clicked bubble
}

/* -------------------- Pre-defined constants -------------------- */
const READY_STATUS: StoryBubbleStatus = {
  state: "READY"
};

const { stories } = siteCopy.storiesSection;

const bubbleIArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const FEATURED_BUBBLE_INDEX = 0; // first position is always the large featured focused one

// positions and size of story bubbles
// offset is calculated from top center of the container
const bubblePositions = {
  large: [
    { x: -300, y: 215, d: 215 }, // large feature focused bubble
    { x: -110, y: 95, d: 110 }, // top left
    { x: 30, y: 10, d: 140 }, // top right
    { x: -30, y: 215, d: 125 }, // 2nd left
    { x: 130, y: 160, d: 110 }, // 2nd right
    { x: -60, y: 360, d: 100 }, // 3rd left
    { x: 100, y: 295, d: 130 }, // 3rd right
    { x: 55, y: 420, d: 95 }, // bottom left
    { x: -65, y: 495, d: 70 } // bottom right
  ],
  medium: [
    { x: -160, y: 225, d: 190 }, // large feature focused bubble
    { x: -60, y: 105, d: 80 }, // top left
    { x: 70, y: 40, d: 120 }, // top right
    { x: 30, y: 170, d: 85 }, // 2nd left
    { x: 90, y: 280, d: 100 }, // 2nd right
    { x: 20, y: 390, d: 80 }, // 3rd left
    { x: 130, y: 410, d: 60 }, // 3rd right
    { x: -85, y: 450, d: 80 }, // bottom left
    { x: 20, y: 485, d: 110 } // bottom right
  ],
  tablet: [
    { x: 150, y: 285, d: 180 }, // large feature focused bubble
    { x: -300, y: 55, d: 125 }, // top 1
    { x: -100, y: 80, d: 100 }, // top 2
    { x: 40, y: 50, d: 65 }, // top 3
    { x: 155, y: 90, d: 125 }, // top 4
    { x: -335, y: 220, d: 110 }, // bottom 1
    { x: -180, y: 200, d: 100 }, // bottom 2
    { x: -40, y: 270, d: 100 }, // bottom 3
    { x: 30, y: 170, d: 95 } // bottom 4
  ],
  mobile: [
    { x: -140, y: 315, d: 130 }, // large feature focused bubble
    { x: 60, y: 55, d: 90 }, // top 1
    { x: -75, y: 30, d: 100 }, // top 2
    { x: -150, y: 115, d: 80 }, // top 3
    { x: -25, y: 150, d: 80 }, // top 4
    { x: -80, y: 230, d: 70 }, // bottom 1
    { x: -150, y: 220, d: 55 }, // bottom 2
    { x: 70, y: 190, d: 80 }, // bottom 3
    { x: 0, y: 270, d: 95 } // bottom 4
  ]
};

/* -------------------- Styles -------------------- */

const BubbleContainer = styled.div`
  position: relative;
  justify-self: center;
  align-self: start;
`;

const StoryBubble = styled.div<StoryBubbleProps>`
  position: absolute;
  display: flex;
  
  background-color: ${props => props.theme.globalConstants.color.textLight};
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  transition: filter 450ms ease-in-out;
  filter: grayscale(100%);

  &:hover,
  &.featured {
    filter: grayscale(0%);
  }

  &.featured {
    cursor: default;
  }

  & > div {
    margin: auto;
  }

  width: ${props => bubblePositions.large[props.bubblePosIndex].d}px;
  height: ${props => bubblePositions.large[props.bubblePosIndex].d}px;
  transform: translate(
    ${props =>
      `${bubblePositions.large[props.bubblePosIndex].x}px, ${
        bubblePositions.large[props.bubblePosIndex].y
      }px`}
  );

  ${props => props.theme.mediaQueries.medium`
    width: ${bubblePositions.medium[props.bubblePosIndex].d}px;
    height: ${bubblePositions.medium[props.bubblePosIndex].d}px;
    transform: translate(
      ${`${bubblePositions.medium[props.bubblePosIndex].x}px, ${
        bubblePositions.medium[props.bubblePosIndex].y
      }px`}
    );
  `}

  ${props => props.theme.mediaQueries.tablet`
    width: ${bubblePositions.tablet[props.bubblePosIndex].d}px;
    height: ${bubblePositions.tablet[props.bubblePosIndex].d}px;
    transform: translate(
      ${`${bubblePositions.tablet[props.bubblePosIndex].x}px, ${
        bubblePositions.tablet[props.bubblePosIndex].y
      }px`}
    );

    &:hover:not(.featured) {
      filter: grayscale(100%);
    }
  `}

${props => props.theme.mediaQueries.tabletMobile`
    width: ${bubblePositions.mobile[props.bubblePosIndex].d}px;
    height: ${bubblePositions.mobile[props.bubblePosIndex].d}px;
    transform: translate(
      ${`${bubblePositions.mobile[props.bubblePosIndex].x}px, ${
        bubblePositions.mobile[props.bubblePosIndex].y
      }px`}
    );
  `}
`;

const SpeechBubble = styled.div<{ shouldHide: boolean }>`
  position: relative;
  justify-self: end;
  align-self: start;
  top: -10px;
  right: -95px;

  width: 440px;
  height: auto;
  padding: 10px 30px;

  background-color: rgba(243, 243, 243, 0.8);
  color: ${props => props.theme.globalConstants.color.textDark};
  border-radius: 8px;

  transition: transform 100ms ease-in-out;
  transform: scale(${props => (props.shouldHide ? 0 : 1)});
  transform-origin: top right;

  & .shown {
    display: inherit;
  }

  & .hidden {
    display: none;
  }

  &::before {
    content: "";

    box-sizing: border-box;
    display: block;
    position: absolute;
    right: -7px;
    top: 20px;

    width: 14px;
    height: 14px;

    border-top: solid 7px rgba(243, 243, 243, 0.8);
    border-left: solid 7px rgba(243, 243, 243, 0.8);
    border-top-left-radius: 2px;
    border-right: solid 7px transparent;
    border-bottom: solid 7px transparent;

    transform: rotate(135deg);

    ${props => props.theme.mediaQueries.tabletMobile`
      top: -7px;
      left: 30px;
      transform: rotate(45deg);
    `}
  }

  & > * {
    display: inline-block;
    margin: 1em 0;
  }

  ${props => props.theme.mediaQueries.medium`
    top: -10px;
    right: -150px;

    width: 400px;
  `}

  ${props => props.theme.mediaQueries.tablet`
    top: 0;
    right: 25%;

    width: 400px;
  `}

  ${props => props.theme.mediaQueries.tabletMobile`
    top: -70px;
    right: 50px;

    width: 240px;
    padding: 10px 20px;

    transform-origin: top left;
  `}

  ${props => props.theme.mediaQueries.mobile`
    right: 30px;
  `}

  ${props => props.theme.mediaQueries.smallMobile`
    right: 0;
  `}
`;

const StoryShowcase = () => {
  // randomize stories on mount using Durstenfeld shuffle algorithm.
  let randomizedStories = [...stories];
  for (let i = randomizedStories.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = randomizedStories[i];
    randomizedStories[i] = randomizedStories[j];
    randomizedStories[j] = tmp;
  }
  const [curStories, updateCurStories] = useState(randomizedStories);
  const [curStatus, updateCurStatus] = useState(READY_STATUS);
  const [interactedWith, updateInteractedWith] = useState(false);

  // swap the selected story with the current featured story
  const swapFeaturedStory = useCallback(
    (newIndex: number) => {
      const newStories = [...curStories];
      newStories[newIndex] = curStories[FEATURED_BUBBLE_INDEX];
      newStories[FEATURED_BUBBLE_INDEX] = curStories[newIndex];

      updateCurStatus({ state: "CHANGING", from: newIndex });
      updateCurStories(newStories);

      // trigger state update to give time for animations to play
      setTimeout(() => {
        updateCurStatus(READY_STATUS);
      }, 550);
    },
    [curStories] // do not update this callback on every render, only when curStories changes
  );

  // auto swap stories until user interacts
  useEffect(() => {
    const autoSwapTimer = setInterval(
      () =>
        !interactedWith &&
        swapFeaturedStory(
          // random index in curStories that's not 0 (cur featured story)
          Math.floor(Math.random() * (stories.length - 1) + 1)
        ),
      6000
    );

    return () => clearInterval(autoSwapTimer);
  }, [interactedWith, swapFeaturedStory]);

  return (
    <>
      <BubbleContainer className="bubbles">
        {bubbleIArr.map(i => (
          <StoryBubble
            key={`bubble-${i}`}
            bubblePosIndex={i}
            className={i === FEATURED_BUBBLE_INDEX ? "featured" : ""}
            onMouseOver={
              i === FEATURED_BUBBLE_INDEX
                ? () => updateInteractedWith(true)
                : () => {}
            }
            onMouseOut={
              i === FEATURED_BUBBLE_INDEX
                ? () => updateInteractedWith(false)
                : () => {}
            }
            onClick={
              i === FEATURED_BUBBLE_INDEX
                ? () => {} // do nothing if clicked on cur featured story
                : () => {
                    updateInteractedWith(true);
                    swapFeaturedStory(i);
                  }
            }
          >
            <CrossfadeImage alt="" src={curStories[i].img} />
          </StoryBubble>
        ))}
      </BubbleContainer>
      <SpeechBubble
        className="quote"
        shouldHide={curStatus.state === "CHANGING"}
        onMouseOver={() => updateInteractedWith(true)}
        onMouseOut={() => updateInteractedWith(false)}
      >
        <Text as="p" variant="sectionText">
          "{curStories[FEATURED_BUBBLE_INDEX].quote}"
        </Text>
        <Text as="span" variant="sectionText">
          {curStories[FEATURED_BUBBLE_INDEX].person},{" "}
          <Link
            className={
              curStories[FEATURED_BUBBLE_INDEX].link ? "shown" : "hidden"
            }
            newTab
            href={curStories[FEATURED_BUBBLE_INDEX].link || ""}
          >
            {curStories[FEATURED_BUBBLE_INDEX].desc}
          </Link>
          <span
            className={
              !curStories[FEATURED_BUBBLE_INDEX].link ? "shown" : "hidden"
            }
          >
            {curStories[FEATURED_BUBBLE_INDEX].desc}
          </span>
        </Text>
      </SpeechBubble>
    </>
  );
};

export default StoryShowcase;
