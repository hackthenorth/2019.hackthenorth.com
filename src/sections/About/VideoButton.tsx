import React, { memo } from "react";
import styled from "styled-components";
import { Text, UnstyledButton } from "@hackthenorth/north";

interface RecapVideoButtonProps {
  toggleVideo: () => void;
  icon: string;
  text: string;
  background: string;
}

const ButtonContents = styled.div`
  z-index: 1;
  display: flex;
  p {
    margin-left: 10px;
    color: white;
  }
`;

const VideoButton = styled(UnstyledButton)`
  position: relative;
  border-radius: 150px;
  width: 303.6px;
  height: 67.35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.globalConstants.color.action};
  margin-top: 35px;

  &:hover {
    opacity: 0.8;
  }

  ${props => props.theme.mediaQueries.mobile`
    width: 260px;
  `}
`;

const VideoButtonBackgroundImage = styled.img`
  position: absolute;
  width: 303.6px;
  height: 67.35px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${props => props.theme.mediaQueries.mobile`
    width: 260px;
  `}
`;

const RecapVideoButton: React.FC<RecapVideoButtonProps> = ({
  icon,
  text,
  background,
  toggleVideo
}) => (
  <VideoButton onClick={toggleVideo}>
    <ButtonContents>
      <img src={icon} alt="play" />
      <Text as="p" variant="sectionText">
        {text}
      </Text>
    </ButtonContents>
    <VideoButtonBackgroundImage src={background} alt="recap video" />
  </VideoButton>
);

export default memo(RecapVideoButton);
