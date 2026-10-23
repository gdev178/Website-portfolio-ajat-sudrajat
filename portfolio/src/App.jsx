import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { LanguageProvider } from './i18n.jsx';
import { ThemeProvider } from './theme.jsx';

import IntroScreen from './components/IntroScreen.jsx';
import Layout from './components/Layout.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import CreativeWorks from './pages/CreativeWorks.jsx';
import CreativeDetail from './pages/CreativeDetail.jsx';
import Certificates from './pages/Certificates.jsx';
import Contact from './pages/Contact.jsx';
import { LOGO_IMAGE } from './data.js';

export default function App() {
  // Tab browser pakai logo yang sama dengan navbar (diunggah lewat CMS).
  // Tidak ada favicon statis di index.html karena logonya dinamis.
  useEffect(() => {
    if (!LOGO_IMAGE) return;
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = LOGO_IMAGE;
  }, []);

  // Intro tampil ulang setiap refresh browser (App hanya mount sekali per
  // reload penuh, jadi ini tidak terpicu saat pindah halaman lewat router)
  const [stage, setStage] = useState("intro");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (stage !== "intro") return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(100, prev + Math.floor(Math.random() * 10) + 5);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "intro" || progress < 100) return;
    const timeout = setTimeout(() => enterSite(), 700);
    return () => clearTimeout(timeout);
  }, [progress, stage]);

  // Kunci scroll selama intro supaya benar-benar pas 1 layar
  useEffect(() => {
    document.body.style.overflow = stage === "intro" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  const enterSite = () => {
    setStage("site");
  };

  const replayIntro = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setProgress(0);
    setStage("intro");
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            {stage === "intro" ? (
              <IntroScreen key="intro" progress={progress} onSkip={enterSite} />
            ) : (
              <Routes key="site">
                <Route element={<Layout onReplayIntro={replayIntro} />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:slug" element={<ProjectDetail />} />
                  <Route path="creative-works" element={<CreativeWorks />} />
                  <Route path="creative-works/:slug" element={<CreativeDetail />} />
                  <Route path="certificates" element={<Certificates />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            )}
          </AnimatePresence>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
}
