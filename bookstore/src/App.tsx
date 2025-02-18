import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardHome from "./pages/DashboardHome";
import DashboardAbout from "./pages/DashboardAbout";
import { ThemeProvider } from "./context/ThemeContext"; 
import Contact from "./pages/Contact";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/inventory" element={<DashboardHome />} />
            <Route path="/record" element={<DashboardAbout />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
