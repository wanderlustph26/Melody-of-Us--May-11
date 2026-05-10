/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar, Hero, HowItWorks, About } from './components/Sections';
import { Portfolio, EmotionalStory, Testimonials, Contact, FAQ, Footer, TrackSong } from './components/MoreSections';
import { Checkout } from './components/Checkout';
import { OrderForm } from './components/OrderForm';
import { ThankYou } from './components/ThankYou';
import { motion, useScroll, useSpring } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <About />
        <Portfolio />
        <EmotionalStory />
        <Testimonials />
        <TrackSong />
        <FAQ />
        <Contact />
      </main>
    </>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <ScrollToTop />
      <div className="selection:bg-brand-blush selection:text-white">
        {/* Scroll Progress Bar */}
        <Routes>
          <Route path="/" element={
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-brand-blush z-[60] origin-left"
              style={{ scaleX }}
            />
          } />
        </Routes>
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}
