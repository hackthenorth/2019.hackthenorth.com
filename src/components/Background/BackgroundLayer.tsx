import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import throttle from "lodash.throttle";

type Position = "beforeSection" | "inSection" | "afterSection";

interface BackgroundLayerProps {
  name: string; // name of the section the background layer is for
  bg: string; // color/gradient of layer
  first: boolean;
}

interface ContainerProps {
  curSection: Position;
  offset: number;
  height: number;
  curOpacity: number;
  bg: string;
  first: boolean;
}

interface DynamicStyle {
  style: {
    position: string;
    top: number | string;
    bottom: number | string;
    zIndex: number;
    opacity: number;
  };
}

// allows event listeners to be passive for better performance
const enablePassive = { passive: true };

/**
 * calculates the position, opacity, and order of background
 * elements based on where the user's window is
 */
const dynamicStyleCalculator = ({
  curSection,
  curOpacity,
  offset,
  first
}: ContainerProps): DynamicStyle => {
  if (curSection === "beforeSection" && !first) {
    return {
      style: {
        position: "fixed",
        top: 0,
        bottom: "auto",
        zIndex: -3,
        opacity: curOpacity
      }
    };
  } else if (
    curSection === "inSection" ||
    (curSection === "beforeSection" && first)
  ) {
    return {
      style: {
        position: "absolute",
        top: `${offset}px`,
        bottom: "auto",
        zIndex: -2,
        opacity: curOpacity
      }
    };
  } else {
    // is afterSection
    return {
      style: {
        position: "fixed",
        top: "auto",
        bottom: 0,
        zIndex: -1,
        opacity: curOpacity
      }
    };
  }
};

// attrs prevents s-c from creating a new component on each change
// eslint-disable-next-line no-unexpected-multiline
const Container = styled.div.attrs<{ style: string }>(dynamicStyleCalculator)<
  ContainerProps
>`
  width: 100%;
  height: ${props => props.height}px;
  background: ${props => props.bg};

  transition: opacity 250ms linear;
`;

const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  name,
  bg,
  first
}) => {
  // get height and position (offset from top) of element
  const section = document.getElementById(name);

  const [[offset, height], updateDims] = useState(
    section ? [section.offsetTop, section.offsetHeight] : [0, 0]
  );
  const [curPos, updatePos] = useState("beforeSection" as Position);
  const [curOpacity, updateOpacity] = useState(1);

  const updateLayerDims = useCallback(
    () =>
      updateDims(section ? [section.offsetTop, section.offsetHeight] : [0, 0]),
    [section]
  );

  const updateLayerPos = useCallback(() => {
    // no throttle, updating position is highest priority
    const layerBottom = offset + height;
    const windowTop = window.scrollY;
    const windowBottom = windowTop + window.innerHeight;
    let newPos = curPos;

    if (windowBottom >= layerBottom) {
      // bottom part or all of window is below section
      newPos = "afterSection";
    } else if (offset <= windowTop) {
      // all of window is in the section
      newPos = "inSection";
    } else if (windowTop < offset) {
      // top part or all of window is above section
      newPos = "beforeSection";
    }

    if (newPos !== curPos) updatePos(newPos); // only update state if it has changed
  }, [curPos, height, offset]);

  const updateLayerOpacity = useCallback(
    throttle(() => {
      // throttle opacity updates since that's more resource intensive (actually changes styles)
      const layerBottom = offset + height;
      const windowBottom = window.scrollY + window.innerHeight;
      const eachOpUnit = 1 / window.innerHeight; // delta of opacity vs window height
      const opPercent = windowBottom - layerBottom; // offset of bottom of window from bottom of layer
      const newOp = Math.min(1, Math.max(0, 1 - opPercent * eachOpUnit)); // opacity of layer, bounded by range from 0 to 1

      if (newOp !== curOpacity) updateOpacity(newOp); // only update opacity if it has changed
    }, 100),
    [curOpacity, height, offset]
  );

  useEffect(updateLayerDims, [updateLayerDims]);

  useEffect(() => {
    // update to correct bg on mount for when the browser remembers scroll position
    updateLayerPos();
    updateLayerOpacity();

    window.addEventListener("scroll", updateLayerOpacity, enablePassive);
    window.addEventListener("scroll", updateLayerPos, enablePassive);
    window.addEventListener("resize", updateLayerOpacity, enablePassive);
    window.addEventListener("resize", updateLayerPos, enablePassive);
    window.addEventListener("resize", updateLayerDims, enablePassive);
    return () => {
      // cleanup
      window.removeEventListener("scroll", updateLayerPos);
      window.removeEventListener("scroll", updateLayerOpacity);
      window.removeEventListener("resize", updateLayerPos);
      window.removeEventListener("resize", updateLayerOpacity);
      window.removeEventListener("resize", updateLayerDims);
    };
  }, [updateLayerPos, updateLayerOpacity, updateLayerDims]);

  return (
    <Container
      curSection={curPos}
      offset={offset}
      height={height}
      curOpacity={curOpacity}
      bg={bg}
      first={first}
    />
  );
};

export default BackgroundLayer;
