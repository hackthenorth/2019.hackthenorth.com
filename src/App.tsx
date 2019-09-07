import React, { Suspense } from "react";
import { North, ThemeDefinition } from "@hackthenorth/north";
import themeDef from "theme";

/* Sections */
import Navbar from "components/Navbar";
import Hero from "sections/Hero";

const LazyLoadedSections = React.lazy(() =>
  import("sections/LazyLoadedSections")
);

const App = () => (
  <North themeDefinition={(themeDef as unknown) as ThemeDefinition}>
    <Navbar />
    <Hero />
    <Suspense fallback={null}>
      <LazyLoadedSections />
    </Suspense>
  </North>
);

export default App;
