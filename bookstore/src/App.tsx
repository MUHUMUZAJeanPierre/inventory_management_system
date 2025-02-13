import React from "react";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import Footer from "./components/Footer";
// import HeroSection from "./components/HeroSection";
// import FeaturedBooks from "./components/FeaturedBooks";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSlider />
      <Footer />
      {/* <HeroSection /> */}
      {/* <FeaturedBooks /> */}
    </>
  );
};

export default App;
