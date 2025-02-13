import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturedBooks from "../components/FeaturedBooks";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturedBooks />
    </>
  );
};

export default Home;
