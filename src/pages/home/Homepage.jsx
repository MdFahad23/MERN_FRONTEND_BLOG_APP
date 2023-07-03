import React from "react";

import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import Articles from "./container/Articles";

const Homepage = () => {
  return (
    <MainLayout>
      <Hero />
      <Articles />
    </MainLayout>
  );
};

export default Homepage;
