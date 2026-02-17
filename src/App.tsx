/**
 * Flowstack Systems Landing Page
 * React Router configuration with multiple pages
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import HomePageV2 from "./pages/HomePageV2";
import HomePageV3 from "./pages/HomePageV3";
import LandingPage from "./pages/LandingPage";
import ApplePage from "./pages/ApplePage";
import DashboardPage from "./pages/DashboardPage";
import LinkedInDashboardPage from "./pages/LinkedInDashboardPage";
import FormularPage from "./pages/FormularPage";
import DankePage from "./pages/DankePage";
import ImpressumPage from "./pages/ImpressumPage";
import DatenschutzPage from "./pages/DatenschutzPage";
import NotFoundPage from "./pages/NotFoundPage";
import AutomationDashboardPage from "./pages/AutomationDashboardPage";
import ContentDashboardPage from "./pages/ContentDashboardPage";
import ColdMailDashboardPage from "./pages/ColdMailDashboardPage";
import HubDashboardPage from "./pages/HubDashboardPage";
import OnboardingPage from "./pages/OnboardingPage";
import NodeLabPage from "./pages/NodeLabPage";
import CookieBanner from "./components/CookieBanner";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePageV3 />} />
        <Route path="/v1" element={<HomePage />} />
        <Route path="/v2" element={<HomePageV2 />} />
        <Route path="/lp" element={<LandingPage />} />
        <Route path="/ap" element={<ApplePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/linkedin" element={<LinkedInDashboardPage />} />
        <Route path="/systems" element={<AutomationDashboardPage />} />
        <Route path="/content" element={<ContentDashboardPage />} />
        <Route path="/coldmail" element={<ColdMailDashboardPage />} />
        <Route path="/hub" element={<HubDashboardPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/node-lab" element={<NodeLabPage />} />
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
