import React, { useEffect } from "https://esm.sh/react@18.3.1";
import { Header, Footer, STYLES } from "./MoveWellSite.jsx";

const NOT_FOUND_STYLES = `
  .nf-wrapper {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 140px 24px 80px;
    background: linear-gradient(135deg, var(--teal-tint-2) 0%, var(--white) 60%);
    position: relative;
    overflow: hidden;
  }
  .nf-wrapper::before {
    content: "";
    position: absolute;
    top: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,107,77,0.12) 0%, transparent 70%);
    border-radius: 50%;
  }
  .nf-card {
    background: #ffffff;
    border: 1.5px solid var(--line);
    border-radius: 28px;
    padding: 56px 40px;
    max-width: 640px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(10,60,66,0.10);
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .nf-code {
    font-family: var(--ff-display);
    font-size: clamp(5rem, 12vw, 7.5rem);
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(135deg, var(--coral) 0%, var(--coral-dark) 50%, var(--teal-deep) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 16px;
    letter-spacing: -0.04em;
  }
  .nf-card h1 {
    font-size: clamp(1.5rem, 3.5vw, 2.1rem);
    color: var(--teal-darker);
    margin: 0 0 12px;
    line-height: 1.25;
  }
  .nf-card p {
    color: var(--ink-soft);
    font-size: 1.02rem;
    line-height: 1.6;
    max-width: 480px;
    margin: 0 0 32px;
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
  }
  .nf-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(255,107,77,0.45);
  }
  @media (max-width: 600px) {
    .nf-wrapper {
      padding: 110px 16px 60px;
    }
    .nf-card {
      padding: 36px 20px;
      border-radius: 20px;
    }
    .nf-btn {
      width: 100% !important;
      height: 52px !important;
      font-size: 1.05rem !important;
      border-radius: 12px !important;
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

      <Header />

      <main className="nf-wrapper">
        <div className="nf-card">
          <span className="eyebrow" style={{ color: "var(--coral)", marginBottom: "8px" }}>
            404 Error
          </span>
          <div className="nf-code">404</div>
          <h1>Page Not Found</h1>
          <p>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
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

      <Footer />
    </div>
  );
}
