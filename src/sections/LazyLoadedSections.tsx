import * as React from "react";

import Background from "components/Background";

import About from "sections/About";
import Stories from "sections/Stories";
import Sponsors from "sections/Sponsors";
import FAQ from "sections/FAQ";
import Footer from "sections/Footer";
import Leaders from "sections/Leaders";

const LazyLoadedSections = () => (
  <>
    <Background />
    <About />
    <Stories />
    <Leaders />
    <Sponsors />
    <FAQ />
    <Footer />
  </>
);

export default LazyLoadedSections;
