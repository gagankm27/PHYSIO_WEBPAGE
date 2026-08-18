import React, { useEffect, useState } from "https://esm.sh/react@18.3.1";
import { Header, Footer, STYLES, SERVICE_AREAS, SPECIALIZATIONS, BookingFilter, WHATSAPP_LINK } from "./HomePage.jsx";


/* ─── DATA ──────────────────────────────────────────────────────────────── */
const SKILLS = [
  "Patient Assessment",
  "Patient Education",
  "Pain Management",
  "Sports Injury & Rehabilitation",
  "Pediatrics Physiotherapy",
  "Geriatric Physiotherapy",
  "Neurological Physiotherapy",
  "Manual Therapy",
  "Dry Needling",
  "Pre & Post-Operative Management",
  "Hospital Management",
  "Rehabilitation & Home Visits",
];

const GALLERY_IMAGES = [
  { src: "./Assets/About/About_01.jpeg", tag: "Spinal Care", caption: "Expert spinal alignment, decompression, and strengthening exercises to relieve chronic back pain." },
  { src: "./Assets/About/About_02.jpeg", tag: "Muscle Rehab", caption: "Targeted soft tissue release and muscle strengthening to recover fully from hamstring and thigh strains." },
  { src: "./Assets/About/About_03.jpeg", tag: "Joint Mobility", caption: "Comprehensive lower body rehabilitation to restore flexibility and strength in legs and knee joints." },
  { src: "./Assets/About/About_04.jpeg", tag: "Post-Operative", caption: "Guided recovery protocols following orthopaedic surgeries to help you regain full function safely." },
  { src: "./Assets/About/About_05.jpeg", tag: "Knee Replacement", caption: "Specialised early-stage mobilisation and ongoing therapy to accelerate recovery after total knee replacement." },
];

/* ── ICON ────────────────────────────────────────────────────── */
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: "14px", height: "14px" }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── EXTRA STYLES ───────────────────────────────────────────────────────── */
const ABOUT_STYLES = `
  .ap-hero {
    padding: 100px 0 80px;
    background: linear-gradient(135deg, var(--teal-tint-2) 0%, var(--white) 60%);
    position: relative;
    overflow: hidden;
  }
  .ap-hero::before {
    content: "";
    position: absolute;
    top: -80px; right: -80px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,107,77,0.10) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
  .ap-hero-grid {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 72px;
    align-items: stretch;
  }
  .ap-photo-wrap {
    position: sticky;
    top: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .ap-photo-frame {
    border-radius: 28px;
    overflow: hidden;
    flex: 1;
    min-height: 420px;
    background: var(--teal-tint);
    box-shadow: 0 28px 60px rgba(10,60,66,0.18);
    position: relative;
  }
  .ap-photo-frame img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: top center;
    display: block;
  }
  .ap-photo-badge {
    position: absolute;
    bottom: -20px; right: -20px;
    background: var(--coral);
    color: #fff;
    padding: 14px 20px;
    border-radius: 16px;
    font-family: var(--ff-display);
    font-weight: 700;
    font-size: 1.05rem;
    line-height: 1.2;
    box-shadow: 0 10px 28px rgba(255,107,77,0.38);
    min-width: 120px;
    text-align: center;
  }
  .ap-photo-badge span {
    display: block;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    opacity: 0.9;
    margin-bottom: 2px;
    text-transform: uppercase;
  }

  /* ── Right column ── */
  .ap-info { display: flex; flex-direction: column; gap: 0; }
  .ap-name {
    font-family: var(--ff-display);
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 800;
    color: var(--teal-darker);
    margin-bottom: 4px;
    line-height: 1.1;
  }
  .ap-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--coral-dark);
    margin-bottom: 6px;
    letter-spacing: 0.02em;
  }
  .ap-edu {
    font-size: 0.9rem;
    color: var(--ink-soft);
    margin-bottom: 28px;
    display: flex; align-items: center; gap: 8px;
  }
  .ap-edu::before {
    content: "🎓";
    font-size: 1rem;
  }
  .ap-divider {
    width: 56px; height: 4px;
    background: linear-gradient(90deg, var(--coral), var(--teal-deep));
    border-radius: 99px;
    margin-bottom: 28px;
  }
  .ap-vision {
    font-size: 1rem;
    line-height: 1.78;
    color: var(--ink-soft);
    margin-bottom: 36px;
    max-width: 640px;
  }
  .ap-stats {
    display: flex; flex-wrap: wrap; gap: 20px;
    margin-bottom: 40px;
  }
  .ap-stat-card {
    background: var(--white);
    border: 1.5px solid var(--line);
    border-radius: 16px;
    padding: 18px 28px;
    text-align: center;
    flex: 1; min-width: 100px;
    box-shadow: 0 4px 16px rgba(10,60,66,0.06);
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }
  .ap-stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(10,60,66,0.12);
  }
  .ap-stat-num {
    font-family: var(--ff-display);
    font-size: 1.9rem;
    font-weight: 800;
    color: var(--teal-deep);
    line-height: 1;
  }
  .ap-stat-label {
    font-size: 0.77rem;
    color: var(--ink-soft);
    font-weight: 500;
    margin-top: 4px;
    letter-spacing: 0.03em;
  }
  .ap-cta-row {
    display: flex; flex-wrap: wrap; gap: 14px; align-items: center;
  }

  /* ── Skills chip section ── */
  .ap-section {
    padding: 80px 0;
  }
  .ap-section-alt {
    background: var(--teal-tint-2);
  }
  .ap-section-head {
    text-align: center;
    margin-bottom: 48px;
  }
  .ap-section-head h2 {
    font-family: var(--ff-display);
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    font-weight: 800;
    color: var(--teal-darker);
    margin-top: 8px;
    margin-bottom: 0;
  }
  .ap-skills-wrap {
    display: flex; flex-wrap: wrap; gap: 12px;
    justify-content: center;
  }
  .ap-skill-chip {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 18px;
    background: var(--white);
    border: 1.5px solid var(--line);
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--ink);
    box-shadow: 0 2px 8px rgba(10,60,66,0.06);
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
  }
  .ap-skill-chip:hover {
    background: var(--teal-tint);
    border-color: var(--teal-deep);
    color: var(--teal-deeper);
    transform: translateY(-2px);
  }
  .ap-skill-chip .ck { color: var(--coral); flex-shrink: 0; }

  /* ── Specialization grid ── */
  .ap-spec-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
  }
  .ap-spec-card {
    background: var(--white);
    border-radius: 20px;
    padding: 28px;
    border: 1.5px solid var(--line);
    box-shadow: 0 4px 20px rgba(10,60,66,0.06);
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ap-spec-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 40px rgba(10,60,66,0.12);
    border-color: var(--teal-deep);
  }
  .ap-spec-icon {
    font-size: 2rem;
    line-height: 1;
    margin-bottom: 4px;
  }
  .ap-spec-title {
    font-family: var(--ff-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--teal-darker);
  }
  .ap-spec-desc {
    font-size: 0.87rem;
    line-height: 1.65;
    color: var(--ink-soft);
  }

  /* ── Gallery cards (blog-style) ── */
  .ap-gallery {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 24px;
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
  }
  .ap-gallery-card {
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--white);
    box-shadow: var(--shadow);
    transition: transform 0.25s ease;
  }
  .ap-gallery-card:hover { transform: translateY(-6px); }
  .ap-gallery-thumb {
    aspect-ratio: 3/4;
    overflow: hidden;
    background: var(--teal-tint-2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ap-gallery-thumb img {
    width: 100%; height: 100%;
    object-fit: contain;
    display: block;
    transition: transform 0.4s ease;
  }
  .ap-gallery-card:hover .ap-gallery-thumb img { transform: scale(1.06); }
  .ap-gallery-body { padding: 18px; }
  .ap-gallery-tag {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--coral-dark);
    margin-bottom: 8px;
    display: inline-block;
  }
  .ap-gallery-body p {
    font-size: 0.85rem;
    color: var(--ink-soft);
    line-height: 1.55;
    margin: 0 0 14px;
  }
  .ap-gallery-read {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--teal-deep);
  }

  /* ── CTA Banner ── */
  .ap-cta-banner {
    background: linear-gradient(130deg, var(--teal-darker) 0%, var(--teal-deep) 100%);
    border-radius: 28px;
    padding: 64px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    margin: 80px 0;
    position: relative;
    overflow: hidden;
  }
  .ap-cta-banner::before {
    content: "";
    position: absolute;
    top: -60px; right: -60px;
    width: 280px; height: 280px;
    background: radial-gradient(circle, rgba(255,107,77,0.20) 0%, transparent 70%);
    border-radius: 50%;
  }
  .ap-cta-banner h2 {
    color: #fff;
    font-family: var(--ff-display);
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    font-weight: 800;
    margin: 0;
    max-width: 480px;
  }
  .ap-cta-banner p {
    color: rgba(255,255,255,0.85);
    font-size: 1.05rem;
    line-height: 1.6;
    margin-top: 12px;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .ap-hero-grid { grid-template-columns: 1fr; }
    .ap-photo-wrap { position: static; max-width: 320px; margin: 0 auto; }
    .ap-gallery { grid-template-columns: 1fr 1fr; padding: 0 20px; }
    .ap-gallery-item:first-child { grid-column: span 2; }
    .ap-cta-banner { text-align: center; justify-content: center; }
    .ap-spec-grid { grid-template-columns: repeat(2, 1fr); padding: 0 20px; gap: 16px; }
  }
  @media (max-width: 768px) {
    .ap-competencies-section { display: none !important; }
    .ap-gallery-card-mobile-hide { display: none !important; }
    .ap-gallery-card-mobile-show { display: block !important; }
  }
  @media (max-width: 600px) {
    .ap-competencies-section { display: none !important; }
    .ap-gallery-card-mobile-hide { display: none !important; }
    .ap-gallery-card-mobile-show { display: block !important; }
    .ap-gallery { grid-template-columns: 1fr; padding: 0 16px; gap: 18px; }
    .ap-gallery-item:first-child { grid-column: span 1; aspect-ratio: 4/3; }
    .ap-cta-banner { padding: 40px 20px; }
    .ap-spec-grid { 
      grid-template-columns: repeat(2, 1fr); 
      gap: 12px; 
      padding: 0 16px; 
    }
    .ap-spec-card {
      padding: 16px 12px;
      border-radius: 14px;
      gap: 6px;
    }
    .ap-spec-icon {
      font-size: 1.55rem;
      margin-bottom: 2px;
    }
    .ap-spec-title {
      font-size: 0.92rem;
      font-weight: 700;
      line-height: 1.25;
    }
    .ap-spec-desc {
      font-size: 0.78rem;
      line-height: 1.45;
    }
  }
`;


/* ─── ABOUT PAGE COMPONENT ───────────────────────────────────────────────── */
export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="mw-root">
      <style>{STYLES}</style>
      <style>{ABOUT_STYLES}</style>

      <Header />

      {/* ── HERO ── */}
      <section className="ap-hero">
        <div className="container">
          <div className="ap-hero-grid">

            {/* Left: Photo */}
            <div className="ap-photo-wrap">
              <div className="ap-photo-frame">
                <img src="./Assets/About/DR_SUSHIL.jpg" alt="Dr. Sushil Hudadi, Physiotherapist" />
              </div>
            </div>

            {/* Right: Info */}
            <div className="ap-info">
              <div style={{ marginBottom: "10px" }}>
                <span className="eyebrow">Meet Your Physiotherapist</span>
              </div>
              <h1 className="ap-name">Dr. Sushil Hudadi</h1>
              <p className="ap-title">(PT) · Physiotherapist</p>
              <div className="ap-divider" />
              <p className="ap-vision">
                Focused and compassionate Physiotherapist committed to helping patients manage pain, recover from injuries,
                and improve their mobility and quality of life. Dynamic and adaptable professional with strong
                problem-solving and communication skills. Passionate about continuous learning, patient care, and
                delivering effective physiotherapy solutions. Able to work collaboratively in diverse clinical environments
                with a positive and patient-focused approach.
              </p>

              {/* Stats */}
              <div className="ap-stats">
                {[
                  { num: "10+", label: "Specializations" },
                  { num: "100%", label: "Patient-Focused" },
                  { num: "BPT", label: "Certified" },
                  { num: "Home", label: "Visits Available" },
                ].map((s) => (
                  <div key={s.label} className="ap-stat-card">
                    <div className="ap-stat-num">{s.num}</div>
                    <div className="ap-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="ap-cta-row">
                <a href="/#contact" className="btn btn-coral">Book a Consultation</a>
                <a href={WHATSAPP_LINK} className="btn btn-outline" target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIALIZATIONS ── */}
      <section className="ap-section">
        <div className="container">
          <div className="ap-section-head">
            <span className="eyebrow">Areas of Expertise</span>
            <h2>Clinical Specializations</h2>
          </div>
        </div>
        {/* Full-width grid — breaks out of container */}
        <div className="ap-spec-grid">
          {SPECIALIZATIONS.map((s) => (
            <div key={s.title} className="ap-spec-card">
              <div className="ap-spec-icon">{s.icon}</div>
              <div className="ap-spec-title">{s.title}</div>
              <div className="ap-spec-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CORE SKILLS ── */}
      <section className="ap-section ap-section-alt ap-competencies-section">
        <div className="container">
          <div className="ap-section-head">
            <span className="eyebrow">Core Competencies</span>
            <h2>Skills & Techniques</h2>
          </div>
          <div className="ap-skills-wrap">
            {SKILLS.map((skill) => (
              <span key={skill} className="ap-skill-chip">
                <span className="ck"><IconCheck /></span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="ap-section-head">
            <span className="eyebrow">In Practice</span>
            <h2>A Glimpse into Dr. Sushil's Work</h2>
          </div>
        </div>
        <div className="ap-gallery">
          {GALLERY_IMAGES.map((item, i) => {
            const isMobileFeatured = ["Muscle Rehab", "Joint Mobility", "Post-Operative"].includes(item.tag);
            return (
              <div key={i} className={`ap-gallery-card ${isMobileFeatured ? "ap-gallery-card-mobile-show" : "ap-gallery-card-mobile-hide"}`}>
                <div className="ap-gallery-thumb">
                  <img src={item.src} alt={item.caption} />
                </div>
                <div className="ap-gallery-body">
                  <span className="ap-gallery-tag">{item.tag}</span>
                  <p>{item.caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div className="ap-cta-banner">
          <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
            <h2 style={{ maxWidth: "100%", margin: "0 auto 12px" }}>Ready to start your recovery journey?</h2>
            <p style={{ maxWidth: "580px", margin: "0 auto", color: "rgba(255,255,255,0.9)", fontSize: "1.05rem" }}>
              Book a home visit with Dr. Sushil and receive expert physiotherapy care from the comfort of your home.
            </p>
          </div>

          <BookingFilter />
        </div>
      </div>

      <Footer />
    </div>
  );
}
