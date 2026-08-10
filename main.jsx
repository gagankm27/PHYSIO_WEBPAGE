import React, { useState, useEffect } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import MoveWellSite from "./MoveWellSite.jsx";
import AboutPage from "./AboutPage.jsx";

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePop);
    
    const handleClick = (e) => {
      const a = e.target.closest('a');
      if (a && a.href && a.href.startsWith(window.location.origin)) {
        const url = new URL(a.href);
        if (url.pathname !== window.location.pathname) {
          e.preventDefault();
          window.history.pushState({}, '', url.pathname + url.search + url.hash);
          setPath(url.pathname);
          if (url.hash) {
            setTimeout(() => {
              const el = document.querySelector(url.hash);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            window.scrollTo(0, 0);
          }
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

  if (path === '/about') {
    return <AboutPage />;
  }
  return <MoveWellSite />;
}

createRoot(document.getElementById("root")).render(<App />);
