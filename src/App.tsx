/**
 * Flowstack Systems Landing Page
 * React Router configuration with multiple pages
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormularPage from "./pages/FormularPage";
import DankePage from "./pages/DankePage";
import ImpressumPage from "./pages/ImpressumPage";
import DatenschutzPage from "./pages/DatenschutzPage";
import NotFoundPage from "./pages/NotFoundPage";
import CookieBanner from "./components/CookieBanner";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kostenlose-beratung" element={<FormularPage />} />
        <Route path="/danke" element={<DankePage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/datenschutz" element={<DatenschutzPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <CookieBanner />
    </Router>
  );
}

export default App;
