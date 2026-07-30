import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';

// Components
import { Navigation5 } from '@/components/watermelon-ui/navigation-5';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';
import ChatWidget from './components/ChatWidget';

// Pages
import Home from './pages/Home';
import Science from './pages/Science';
import WhyItWorks from './pages/WhyItWorks';
import VisionMission from './pages/VisionMission';
import Industries from './pages/Industries';
import Problem from './pages/Problem';
import Genomics from './pages/Genomics';
import { QShieldTrustless, QShieldEmbedded, QShieldLite } from './pages/ProductTemplate';
import FinancialServices from './pages/FinancialServices';
import Healthcare from './pages/Healthcare';
import Government from './pages/Government';
import Energy from './pages/Energy';
import Assistant from './pages/Assistant';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/Home';

  return (
    <div className="relative isolate min-h-screen flex flex-col transition-colors duration-300 bg-white text-gray-900">
      {isHome && <BackgroundCanvas />}
      <Navigation5 />
      <main className="relative z-10 flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Science" element={<Science />} />
          <Route path="/WhyItWorks" element={<WhyItWorks />} />
          <Route path="/VisionMission" element={<VisionMission />} />
          <Route path="/Industries" element={<Industries />} />
          <Route path="/Problem" element={<Problem />} />
          <Route path="/Genomics" element={<Genomics />} />
          <Route path="/QShieldTrustless" element={<QShieldTrustless />} />
          <Route path="/QShieldEmbedded" element={<QShieldEmbedded />} />
          <Route path="/QShieldLite" element={<QShieldLite />} />
          <Route path="/FinancialServices" element={<FinancialServices />} />
          <Route path="/Healthcare" element={<Healthcare />} />
          <Route path="/Government" element={<Government />} />
          <Route path="/Energy" element={<Energy />} />
          <Route path="/Assistant" element={<Assistant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;