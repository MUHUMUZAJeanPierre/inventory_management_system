import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardHome from "./pages/DashboardHome";
import DashboardAbout from "./pages/DashboardAbout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/inventory" element={<DashboardHome />} />
          <Route path="/record" element={<DashboardAbout />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
