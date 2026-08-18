import React, { useState, useEffect } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePop);
    
    const handleClick = (e) => {
      const a = e.target.closest('a');
      if (a && a.href && a.href.startsWith(window.location.origin)) {
        const url = new URL(a.href);
        const currentClean = window.location.pathname.replace(/\/$/, '') || '/';
        const targetClean = url.pathname.replace(/\/$/, '') || '/';

        if (targetClean !== currentClean) {
          e.preventDefault();
          window.history.pushState({}, '', url.pathname + url.search + url.hash);
          setPath(url.pathname);
          if (url.hash) {
            setTimeout(() => {
              const el = document.querySelector(url.hash);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        } else if (targetClean === '/' && (!url.hash || url.hash === '#home' || url.hash === '#')) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (url.hash) {
          e.preventDefault();
          window.history.pushState({}, '', url.pathname + url.search + url.hash);
          const el = document.querySelector(url.hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('popstate', handlePop);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const normalizedPath = (path || '/').replace(/\/$/, '') || '/';

  if (normalizedPath === '/about') {
    return <AboutPage />;
  }
  if (normalizedPath === '/' || normalizedPath === '/index.html') {
    return <HomePage />;
  }
  return <NotFoundPage />;
}

createRoot(document.getElementById("root")).render(<App />);
