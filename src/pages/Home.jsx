import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import { ProblemSection } from '../components/ProblemSection';
import { SolutionSection } from '../components/SolutionSection';
import { ProductsSection } from '../components/ProductsSection';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      <ProblemSection />
      <SolutionSection />
      <ProductsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
