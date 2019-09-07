/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/*eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";

import CarouselObject, { CarouselItem } from "./CarouselObject";

const CarouselContainer = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
`;

interface CarouselProps {
  speed?: number;
  itemWidth: number;
  items: CarouselItem[];
  setOrganizerText: any;
  clearOrganizerText(): void;
}

interface CarouselState {
  items: CarouselItem[];
}

export default class InfiniteCarousel extends React.Component<
  CarouselProps,
  CarouselState
> {
  right: number;
  plcObjectRefs: any;
  hoveringOver: boolean;
  isVisible: boolean;
  ref: any;

  constructor(props: CarouselProps) {
    super(props);
    this.right = 0;
    this.state = {
      items: props.items
    };
    this.plcObjectRefs = Array(this.state.items.length).fill(null);
    this.hoveringOver = false;
    this.isVisible = false;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.checkVisibility);
    window.addEventListener("resize", this.checkVisibility);
    window.addEventListener("load", this.checkVisibility);
    window.setInterval(requestAnimationFrame.bind(window, this.advance), 16.66);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.checkVisibility);
    window.removeEventListener("resize", this.checkVisibility);
    window.removeEventListener("load", this.checkVisibility);
  }

  onHover = () => {
    this.hoveringOver = true;
  };

  onLeave = () => {
    this.hoveringOver = false;
  };

  setRef = (r: any) => {
    this.ref = r;
  };

  advance = () => {
    const { itemWidth, speed } = this.props;
    if (!this.hoveringOver && this.isVisible) {
      const { items } = this.state;
      if (this.right <= -itemWidth) {
        this.right += itemWidth;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        items.push(items.shift()!);
        this.setState({ items });
      }
      this.right -= (speed || 5) / 10;
      this.plcObjectRefs.forEach((ref: any, index: number) => {
        if (ref !== null) {
          const objRight = index * itemWidth + this.right;
                    ref.setRight(objRight); /* eslint-disable-line */
        }
      });
    }
  };

  checkVisibility = () => {
    const rect = this.ref.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    // Partially visible elements return true:
    this.isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  };

  attachRef = (index: number, ref: any) => {
    this.plcObjectRefs[index] = ref;
  };

  render() {
    return (
      <CarouselContainer
        className="carousel"
        ref={this.setRef}
        onMouseEnter={this.onHover}
        onMouseLeave={this.onLeave}
      >
        {this.state.items.map((p, index) => (
          <CarouselObject
            key={`${p.text}-${index}`}
            ref={this.attachRef.bind(this, index)}
            text={p.text}
            alt={p.alt}
            img={p.img}
            setOrganizerText={this.props.setOrganizerText}
            clearOrganizerText={this.props.clearOrganizerText}
          />
        ))}
      </CarouselContainer>
    );
  }
}
