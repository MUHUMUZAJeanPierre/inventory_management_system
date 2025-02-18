import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardHome from "./pages/DashboardHome";
import DashboardAbout from "./pages/DashboardAbout";
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeProvider

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/inventory" element={<DashboardHome />} />
            <Route path="/record" element={<DashboardAbout />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
