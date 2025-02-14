// import React from "react";
// import Header from "./components/Header";
// import HeroSlider from "./components/HeroSlider";
// import Footer from "./components/Footer";
// import About from "./pages/About";
// import Sidebar from "./components/Sidebar";
// import TopNavigation from "./components/TopNavigation";
// // import HeroSection from "./components/HeroSection";
// // import FeaturedBooks from "./components/FeaturedBooks";

// const App: React.FC = () => {
//   return (
//     <>
//       {/* <Header /> */}
//       {/* <HeroSlider /> */}
//       {/* <About /> */}
//       {/* <Footer /> */}
//       {/* <Sidebar /> */}
//       <TopNavigation/>
//     </>
//   );
// };

// export default App;
// import Layout from "./components/Layout";

// function App() {
//   return <Layout />;
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardHome from "./pages/DashboardHome";
import DashboardAbout from "./pages/DashboardAbout";
import InventoryForm from "./components/InventoryForm";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/about" element={<DashboardAbout />} />
          <Route path="/" element={<InventoryForm />} />
          {/* <Route path="/courses" element={<Home />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
