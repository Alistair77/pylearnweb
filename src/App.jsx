import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';

// Components
import { Navigation5 } from '@/components/watermelon-ui/navigation-5';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';
import ChatWidget from './components/ChatWidget';

// Pages
import Home from './pages/Home';

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
    <div className="relative isolate min-h-screen flex flex-col transition-colors duration-300 bg-page text-gray-900">
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
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;