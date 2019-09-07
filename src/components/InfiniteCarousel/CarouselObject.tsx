/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/*eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import styled from "styled-components";

export interface CarouselItem {
  text: string;
  img: string;
  alt: string;
  setOrganizerText?: any;
}

export interface CarouselObjectProps {
  text: string;
  img: string;
  alt: string;
  setOrganizerText?: any;
  clearOrganizerText(): void;
}

const CarouselComponent = styled.div`
  top: 0;
  margin: 0;
  padding: 0;
  width: 70px;
  position: absolute;
`;

const Headshot = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  filter: grayscale(100%);
  transition: all 0.5s ease;

  &:hover {
    filter: grayscale(0%);
  }
`;

class CarouselObject extends React.Component<CarouselObjectProps, {}> {
  ref: HTMLDivElement | undefined;
  setRight = (right: number) => {
    if (this.ref) {
      this.ref.style.transform = `translateX(${right}px)`;
    }
  };
  setRef = (ref: HTMLDivElement) => {
    this.ref = ref;
  };
  render() {
    return (
      <CarouselComponent ref={this.setRef}>
        <Headshot
          onMouseEnter={() => this.props.setOrganizerText(this.props.text)}
          onMouseLeave={this.props.clearOrganizerText}
          src={this.props.img}
          alt={this.props.alt}
        />
      </CarouselComponent>
    );
  }
}

export default CarouselObject;
