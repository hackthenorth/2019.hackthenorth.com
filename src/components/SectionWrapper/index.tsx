import React from "react";
import styled from "styled-components";

interface SectionWrapperProps {
  id: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any; // seems like the recommended practice is to type children as any (https://github.com/Microsoft/TypeScript/issues/6471)
}

const Container = styled.section`
  position: relative;
  margin: auto;
  box-sizing: border-box;
  overflow-x: hidden;

  min-height: 100vh;
  max-width: ${props => props.theme.globalConstants.width.sectionsLarge}px;
  width: 100%;


  padding: ${props => props.theme.globalConstants.padding.sectionsLarge}px;
  ${props => props.theme.mediaQueries.medium`
    padding: ${props.theme.globalConstants.padding.sectionsMedium}px;
  `}
  ${props => props.theme.mediaQueries.tablet`
    padding: ${props.theme.globalConstants.padding.sectionsTablet}px;
  `}
  ${props => props.theme.mediaQueries.tabletMobile`
    padding: ${props.theme.globalConstants.padding.sectionsTabletMobile}px;
  `}
  ${props => props.theme.mediaQueries.mobile`
    padding: ${props.theme.globalConstants.padding.sectionsMobile}px;
  `}
  ${props => props.theme.mediaQueries.smallMobile`
    padding: ${props.theme.globalConstants.padding.sectionsSmallMobile}px;
  `}
`;

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  className,
  children
}) => (
  <Container id={id} className={className}>
    {children}
  </Container>
);

export default SectionWrapper;
