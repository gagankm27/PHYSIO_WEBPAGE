import React, { useEffect } from "https://esm.sh/react@18.3.1";
import { STYLES } from "./MoveWellSite.jsx";

const NOT_FOUND_STYLES = `
  .nf-navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--line);
    padding: 12px 24px;
  }
  .nf-nav-inner {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .nf-nav-logo {
    height: 52px;
    display: block;
  }
  .nf-page {
    min-height: calc(100vh - 77px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background: linear-gradient(135deg, var(--teal-tint-2) 0%, #ffffff 50%, var(--teal-tint) 100%);
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }
  .nf-page::before {
    content: "";
    position: absolute;
    top: -120px;
    right: -120px;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(255,107,77,0.14) 0%, transparent 70%);
    border-radius: 50%;
  }
  .nf-page::after {
    content: "";
    position: absolute;
    bottom: -120px;
    left: -120px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(10,92,99,0.12) 0%, transparent 70%);
    border-radius: 50%;
  }
  .nf-card {
    background: #ffffff;
    border: 1.5px solid var(--line);
    border-radius: 28px;
    padding: 52px 40px;
    max-width: 540px;
    width: 100%;
    text-align: center;
    box-shadow: 0 24px 70px rgba(10,60,66,0.12);
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .nf-code {
    font-family: var(--ff-display);
    font-size: clamp(5.5rem, 14vw, 8rem);
    font-weight: 900;
    line-height: 0.95;
    background: linear-gradient(135deg, var(--coral) 0%, var(--coral-dark) 45%, var(--teal-deep) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 12px;
    letter-spacing: -0.04em;
  }
  .nf-card h1 {
    font-size: clamp(1.4rem, 3.5vw, 1.9rem);
    color: var(--teal-darker);
    margin: 0 0 10px;
    line-height: 1.25;
    font-weight: 800;
  }
  .nf-card p {
    color: var(--ink-soft);
    font-size: 0.96rem;
    line-height: 1.6;
    max-width: 420px;
    margin: 0 0 28px;
  }
  .nf-btn {
    height: 52px;
    font-size: 1.05rem;
    font-weight: 700;
    padding: 14px 36px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(255,107,77,0.35);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    width: 100%;
    max-width: 320px;
    box-sizing: border-box;
  }
  .nf-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(255,107,77,0.45);
  }
  @media (max-width: 600px) {
    .nf-navbar {
      padding: 10px 16px;
    }
    .nf-nav-logo {
      height: 42px;
    }
    .nf-page {
      padding: 24px 16px;
      min-height: calc(100vh - 63px);
    }
    .nf-card {
      padding: 36px 20px;
      border-radius: 20px;
    }
    .nf-code {
      font-size: 5.2rem;
    }
    .nf-btn {
      max-width: 100%;
      height: 52px;
      font-size: 1.02rem;
      border-radius: 12px;
    }
  }
`;

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mw-root">
      <style>{STYLES}</style>
      <style>{NOT_FOUND_STYLES}</style>

      {/* Navbar with brand logo title only (no buttons) */}
      <header className="nf-navbar">
        <div className="nf-nav-inner">
          <a href="/" title="Hudadi Physiotherapy">
            <img src="./Assets/LOGO_01.png" alt="Hudadi Physiotherapy Logo" className="nf-nav-logo" />
          </a>
        </div>
      </header>

      <main className="nf-page">
        <div className="nf-card">
          <div className="nf-code">404</div>
          <h1>Page Not Found</h1>
          <p>
            The page you are looking for doesn't exist or has been moved. Let's get you back to recovery.
          </p>
          <a href="/" className="btn btn-coral nf-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: "18px", height: "18px" }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}
