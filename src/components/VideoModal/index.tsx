import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { UnstyledButton } from "@hackthenorth/north";
import { fadeIn, fadeOut } from "animations/fades";

interface VideoModalVisibleProps {
  isVideoOpen: boolean;
}

interface VideoModalProps extends VideoModalVisibleProps {
  onClose: () => void;
  videoOptions: VideoOptions;
  closeIcon: string;
}

interface VideoOptions {
  url: string;
}

const ModalContainer = styled.div<VideoModalVisibleProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${props => (props.isVideoOpen ? "visible" : "hidden")};
  animation: ${props => (props.isVideoOpen ? fadeIn : fadeOut)} 0.25s ease-out;
  transition: visibility 0.25s ease-out;
`;

const VideoContainer = styled.div<VideoModalVisibleProps>`
  max-width: 940px;
  width: 100%;
  visibility: ${props => (props.isVideoOpen ? "visible" : "hidden")};
  animation: ${props => (props.isVideoOpen ? fadeIn : fadeOut)} 0.25s ease-out;
  transition: visibility 0.25s ease-out;
`;

const VideoBody = styled.div`
  width: 100%;
  height: 0;
  position: relative;
  padding-bottom: 56.25%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  z-index: 2;
  top: -60px;
  right: 0px;
  display: inline-block;

  &:focus {
    opacity: 0.8;
  }

  img {
    width: 35px;
    height: 35px;
  }
`;

const VideoModal: React.FC<VideoModalProps> = ({
  isVideoOpen,
  onClose,
  videoOptions,
  closeIcon
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, onClose]);

  return (
    <ModalContainer onClick={onClose} isVideoOpen={isVideoOpen}>
      <VideoContainer isVideoOpen={isVideoOpen && loaded}>
        <VideoBody>
          <CloseButton onClick={onClose}>
            <img src={closeIcon} alt="close" />
          </CloseButton>
          <iframe
            title="Hack the North 2018"
            width="460"
            height="230"
            src={videoOptions.url}
            frameBorder="0"
            allowFullScreen
            onLoad={() => setLoaded(true)}
          />
        </VideoBody>
      </VideoContainer>
    </ModalContainer>
  );
};

export default VideoModal;
