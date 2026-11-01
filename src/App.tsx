import React, { useState, useEffect } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);

  const WA_NUMBER = "919909336825";
  const WA_MSG = "Hello, I would like to book a Clear Aligner Consultation at Dr. Parikh’s Pristine Dental Clinic. Please share the available appointment timings.";
  const waURL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setIsScrolled(y > 8);
      setShowMobileBar(y > 420);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll(".rv, .timeline");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        setIsMenuOpen(false);
      }
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Are Clear Aligners noticeable?",
      a: "Clear aligners are made from a thin, transparent material, so they are usually hard to notice in everyday conversation. How discreet they look can vary depending on your individual treatment plan."
    },
    {
      q: "Can I remove Clear Aligners while eating?",
      a: "Yes. Aligners are removed while eating and drinking anything other than water, and worn again after brushing. They are generally worn for most of the day, as advised by your dentist."
    },
    {
      q: "How long does aligner treatment take?",
      a: "Treatment duration varies according to the individual case. Your dentist can share an estimated timeline after the X-ray, 3D scan and clinical assessment."
    },
    {
      q: "Are Clear Aligners suitable for everyone?",
      a: "Not every case. Many alignment concerns can be treated with aligners, while some may be better suited to other options such as braces. Suitability is confirmed only after a clinical examination."
    },
    {
      q: "What happens during the consultation?",
      a: "The dentist checks your teeth, understands your smile concerns and explains whether Clear Aligners may be suitable. If further records such as an X-ray or 3D scan are needed, the team will explain this at the clinic."
    },
    {
      q: "How often are follow-up appointments required?",
      a: "Follow-up visits are scheduled by your dentist according to your treatment plan, so progress can be reviewed and the next set of aligners can be guided correctly."
    }
  ];

  return (
    <>
      {/* SVG SPRITE DEFINITIONS */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <symbol id="i-wa" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z"/>
          </symbol>
          <symbol id="i-phone" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>
          </symbol>
          <symbol id="i-check" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5"/>
          </symbol>
          <symbol id="i-pin" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </g>
          </symbol>
          <symbol id="i-globe" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/>
            </g>
          </symbol>
          <symbol id="i-ig" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/>
              <path d="M17.5 6.5h.01"/>
            </g>
          </symbol>
          <symbol id="i-eye" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
              <path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c7 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68"/>
              <path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.39-1.61"/>
              <path d="m2 2 20 20"/>
            </g>
          </symbol>
          <symbol id="i-hand" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M8 16H3v5"/>
            </g>
          </symbol>
          <symbol id="i-scan" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/>
              <path d="M12 7l4 2.3v4.6L12 16l-4-2.1V9.3Z"/>
              <path d="M8 9.3l4 2.2 4-2.2M12 11.5V16"/>
            </g>
          </symbol>
          <symbol id="i-user" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.9 3.9L18 7.5l-3 2.9.7 4.1L12 12.6l-3.7 1.9.7-4.1-3-2.9 4.1-.6Z"/>
              <path d="M5 21a7 7 0 0 1 14 0"/>
            </g>
          </symbol>
          <symbol id="i-plus" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M12 5v14M5 12h14"/>
          </symbol>
          <symbol id="i-menu" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16"/>
          </symbol>
          <symbol id="i-x" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M18 6 6 18M6 6l12 12"/>
          </symbol>
          <symbol id="i-arrows" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m9 18-6-6 6-6M15 6l6 6-6 6"/>
          </symbol>
          <symbol id="i-info" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </g>
          </symbol>
          <symbol id="i-xray" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2"/>
              <path d="M9 8c0 1.5 1 2 1 4s-1 3-1 4M15 8c0 1.5-1 2-1 4s1 3 1 4M12 8v8"/>
            </g>
          </symbol>
          <symbol id="i-chat" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>
              <path d="M8 9h8M8 13h5"/>
            </g>
          </symbol>
          <symbol id="i-tooth" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 5.5C10.5 4 8.5 3 6.5 3.5 4 4.2 3 6.8 3.6 9.5c.5 2.1 1.3 3.2 1.7 5.3.5 2.6.8 6.2 2.6 6.2 1.7 0 1.8-3.5 2.6-5.3.4-.9.9-1.2 1.5-1.2s1.1.3 1.5 1.2c.8 1.8.9 5.3 2.6 5.3 1.8 0 2.1-3.6 2.6-6.2.4-2.1 1.2-3.2 1.7-5.3.6-2.7-.4-5.3-2.9-6-2-.5-4 .5-5.5 2Z"/>
          </symbol>
          <symbol id="i-cpu" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="12" rx="2"/>
              <path d="M8 20h8M12 16v4"/>
              <path d="M8 10.5l2.5 2.5L16 8"/>
            </g>
          </symbol>
          <symbol id="i-heart" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </symbol>
          <symbol id="i-cal" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4"/>
            </g>
          </symbol>
          <symbol id="i-spark" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 0c.6 5.6 3.4 8.9 12 12-8.6 3.1-11.4 6.4-12 12-.6-5.6-3.4-8.9-12-12 8.6-3.1 11.4-6.4 12-12Z"/>
          </symbol>
        </defs>
      </svg>

      {/* HEADER */}
      <header className={`hdr ${isScrolled ? 'scrolled' : ''}`} id="hdr">
        <div className="wrap hdr-in">
          <div className="hdr-left">
            <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="brand" aria-label="Dr. Parikh's Pristine Dental Clinic — home">
              <img src="/images/logo.png" alt="Dr. Parikh's Pristine Dental logo" width={54} height={54} />
              <span className="brand-txt">
                <b>Pristine Dental</b>
                <small>Dr. Parikh's Clinic · Chandkheda</small>
              </span>
            </a>
            <div className="hdr-acts">
              <a className="hbtn hbtn-wa js-wa" href={waURL} target="_blank" rel="noopener noreferrer" aria-label="Book on WhatsApp">
                <svg><use href="#i-wa"/></svg>
                <span>WhatsApp</span>
              </a>
              <a className="hbtn hbtn-call" href="tel:+919909336825" aria-label="Call 9909336825">
                <svg><use href="#i-phone"/></svg>
                <span>Call</span>
              </a>
            </div>
          </div>
          <nav className="nav" aria-label="Main">
            <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>Home</a>
            <a href="#why" onClick={(e) => handleNavClick(e, "#why")}>Why Aligners</a>
            <a href="#process" onClick={(e) => handleNavClick(e, "#process")}>Process</a>
            <a href="#offer" onClick={(e) => handleNavClick(e, "#offer")}>Book</a>
            <a href="#faq" onClick={(e) => handleNavClick(e, "#faq")}>FAQ</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>Contact</a>
          </nav>
          <button
            className="burger"
            id="burger"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mnav"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg><use href={isMenuOpen ? "#i-x" : "#i-menu"}/></svg>
          </button>
        </div>
        <div className={`mnav ${isMenuOpen ? 'open' : ''}`} id="mnav">
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>Home</a>
          <a href="#why" onClick={(e) => handleNavClick(e, "#why")}>Why Aligners</a>
          <a href="#process" onClick={(e) => handleNavClick(e, "#process")}>Process</a>
          <a href="#offer" onClick={(e) => handleNavClick(e, "#offer")}>Book</a>
          <a href="#faq" onClick={(e) => handleNavClick(e, "#faq")}>FAQ</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>Contact</a>
          <a className="btn btn-wa js-wa" href={waURL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
            <svg><use href="#i-wa"/></svg>Book Consultation
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow load d1"><i></i>CLEAR ALIGNER CONSULTATION</span>
              <h1 className="hero-h1">
                <span className="h1-line">
                  <span className="w" style={{ '--w': 0 } as React.CSSProperties}>Your</span>{' '}
                  <span className="w" style={{ '--w': 1 } as React.CSSProperties}>Confident</span>{' '}
                  <span className="w" style={{ '--w': 2 } as React.CSSProperties}>Smile</span>{' '}
                  <span className="w" style={{ '--w': 3 } as React.CSSProperties}>Starts</span>{' '}
                  <span className="w" style={{ '--w': 4 } as React.CSSProperties}>Here</span>
                  <svg className="underline" viewBox="0 0 400 14" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M2 9 C 90 2, 210 2, 398 7" fill="none" stroke="#62D4C4" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              <p className="hero-sub load d3">
                Discover a discreet and modern approach to smile alignment with a personalised Clear Aligner consultation at Dr. Parikh’s Pristine Dental Clinic.
              </p>

              <div className="cta-row load d5">
                <a className="btn btn-wa js-wa glow" href={waURL} target="_blank" rel="noopener noreferrer">
                  <svg><use href="#i-wa"/></svg>Book on WhatsApp
                </a>
                <a className="btn btn-ghost" href="tel:+919909336825">
                  <svg><use href="#i-phone"/></svg>Call 9909336825
                </a>
              </div>
              <div className="trust load d6">
                <span>Transparent</span>
                <span>Removable</span>
                <span>Personalised</span>
              </div>
            </div>

            <div className="hero-visual load-v" aria-label="Young woman holding a clear aligner">
              <div className="halo"></div>
              <div className="ring r2"></div>
              <div className="disc"></div>
              <div className="ring"></div>
              <figure className="portrait">
                <img
                  src="/images/hero-portrait.webp"
                  alt="Smiling woman holding a clear aligner, with close-ups of an aligner being worn, a clear aligner tray and a dental model"
                  width={1200}
                  height={1200}
                />
              </figure>
              <span className="spark" style={{ left: '18%', top: '22%', animationDelay: '.2s' }}><svg><use href="#i-spark"/></svg></span>
              <span className="spark" style={{ right: '16%', top: '14%', width: '18px', height: '18px', animationDelay: '1.4s' }}><svg><use href="#i-spark"/></svg></span>
              <span className="spark" style={{ right: '10%', top: '52%', width: '10px', height: '10px', animationDelay: '2.6s' }}><svg><use href="#i-spark"/></svg></span>
              <span className="spark" style={{ left: '12%', bottom: '30%', width: '11px', height: '11px', animationDelay: '3.3s', color: '#C7A35A' }}><svg><use href="#i-spark"/></svg></span>
              <span className="spark" style={{ left: '46%', top: '8%', width: '9px', height: '9px', animationDelay: '.9s', color: '#C7A35A' }}><svg><use href="#i-spark"/></svg></span>
              <div className="chip c1"><svg><use href="#i-eye"/></svg>Nearly invisible</div>
              <div className="chip c2"><svg><use href="#i-scan"/></svg>3D digitally planned</div>
              <div className="journey" aria-label="Step-by-step smile journey">
                <span>Today</span>
                <span className="dots"><i></i><em></em><i></i><em></em><i></i><em></em><i></i></span>
                <b>Your planned smile</b>
              </div>
            </div>
          </div>
        </section>

        {/* WHY ALIGNERS */}
        <section className="sec benefits" id="why">
          <div className="wrap">
            <div className="sec-head rv">
              <span className="kicker">WHY CLEAR ALIGNERS</span>
              <h2>Why Choose Clear Aligners?</h2>
              <p>A modern, comfortable way to straighten teeth that fits into everyday life.</p>
            </div>
            <div className="b-grid">
              <article className="card rv" style={{ '--i': 0 } as React.CSSProperties}>
                <div className="ico"><svg><use href="#i-eye"/></svg></div>
                <h3>Nearly Invisible</h3>
                <p>Designed for a discreet appearance during daily life.</p>
              </article>
              <article className="card rv" style={{ '--i': 1 } as React.CSSProperties}>
                <div className="ico"><svg><use href="#i-hand"/></svg></div>
                <h3>Removable Convenience</h3>
                <p>Remove them while eating, brushing and cleaning.</p>
              </article>
              <article className="card rv" style={{ '--i': 2 } as React.CSSProperties}>
                <div className="ico"><svg><use href="#i-scan"/></svg></div>
                <h3>Digitally Planned</h3>
                <p>Treatment planning supported by modern 3D scanning.</p>
              </article>
              <article className="card rv" style={{ '--i': 3 } as React.CSSProperties}>
                <div className="ico"><svg><use href="#i-user"/></svg></div>
                <h3>Made for Your Smile</h3>
                <p>The treatment approach is planned according to individual dental requirements.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ALIGNERS VS BRACES */}
        <section className="sec compare-sec" id="how">
          <div className="wrap">
            <div className="sec-head center rv">
              <span className="kicker">ALIGNERS OR BRACES?</span>
              <h2>Clear Aligners or Braces: Which Suits Your Smile?</h2>
              <p>Both can straighten teeth. The real difference is how they look and feel in your daily life.</p>
            </div>
            <figure className="vs-photo rv">
              <img
                src="/images/aligner-vs-braces.webp"
                alt="Side-by-side comparison of a clear aligner and metal braces on teeth"
                width={1468}
                height={874}
                loading="lazy"
              />
              <span className="vs-tag l">Clear Aligners</span>
              <span className="vs-tag r">Braces</span>
            </figure>
            <div className="vs-grid">
              <div className="vs-col aligner rv" style={{ '--i': 0 } as React.CSSProperties}>
                <h3>Clear Aligners</h3>
                <ul>
                  <li><svg><use href="#i-check"/></svg>Transparent and nearly invisible</li>
                  <li><svg><use href="#i-check"/></svg>Removable while eating and brushing</li>
                  <li><svg><use href="#i-check"/></svg>Smooth trays with no wires or brackets</li>
                  <li><svg><use href="#i-check"/></svg>Treatment planned with a 3D digital scan</li>
                </ul>
              </div>
              <div className="vs-col braces rv" style={{ '--i': 1 } as React.CSSProperties}>
                <h3>Braces</h3>
                <ul>
                  <li><svg><use href="#i-check"/></svg>Brackets and wires fixed on the teeth</li>
                  <li><svg><use href="#i-check"/></svg>Stay in place throughout treatment</li>
                  <li><svg><use href="#i-check"/></svg>No trays to remember to wear</li>
                  <li><svg><use href="#i-check"/></svg>Often suited to more complex cases</li>
                </ul>
              </div>
            </div>
            <div className="note vs-note rv">
              <svg><use href="#i-info"/></svg>
              <span>Not sure which is right for you? The dentist will suggest the most suitable option after examining your teeth.</span>
            </div>
          </div>
        </section>

        {/* WHO */}
        <section className="sec" id="who">
          <div className="wrap who-grid">
            <div className="who-panel rv">
              <span className="kicker" style={{ color: 'var(--aqua)' }}>SUITABILITY</span>
              <h2>Who Can Consider Aligners?</h2>
              <p>Clear aligners are an option for many common alignment concerns. Your consultation helps you understand whether they are right for you.</p>
              <p className="disclaimer">Suitability can only be confirmed after a clinical dental examination and diagnostic assessment.</p>
            </div>
            <ul className="who-list">
              <li className="rv" style={{ '--i': 0 } as React.CSSProperties}>
                <span><svg><use href="#i-check"/></svg></span>Gaps between teeth
              </li>
              <li className="rv" style={{ '--i': 1 } as React.CSSProperties}>
                <span><svg><use href="#i-check"/></svg></span>Mild crowding
              </li>
              <li className="rv" style={{ '--i': 2 } as React.CSSProperties}>
                <span><svg><use href="#i-check"/></svg></span>Selected bite concerns
              </li>
              <li className="rv" style={{ '--i': 3 } as React.CSSProperties}>
                <span><svg><use href="#i-check"/></svg></span>Adults seeking a discreet option
              </li>
              <li className="rv" style={{ '--i': 4 } as React.CSSProperties}>
                <span><svg><use href="#i-check"/></svg></span>Patients looking for a removable orthodontic solution
              </li>
            </ul>
          </div>
        </section>

        {/* PROCESS */}
        <section className="sec" id="process" style={{ background: 'var(--pearl)' }}>
          <div className="wrap">
            <div className="sec-head center rv">
              <span className="kicker">YOUR JOURNEY</span>
              <h2>Simple Treatment Journey</h2>
              <p>Four clear steps, with guidance from the dental team at every stage.</p>
            </div>
            <div className="timeline rv" id="timeline">
              <div className="tl-line"><i></i></div>
              <div className="step">
                <div className="num">01</div>
                <div>
                  <h3>Consultation</h3>
                  <p>Discuss your smile concerns with the dental professional.</p>
                </div>
              </div>
              <div className="step">
                <div className="num">02</div>
                <div>
                  <h3>X-ray &amp; 3D Scan</h3>
                  <p>Complete the required digital assessment and records.</p>
                </div>
              </div>
              <div className="step">
                <div className="num">03</div>
                <div>
                  <h3>Personalised Plan</h3>
                  <p>Review the recommended treatment approach and expected timeline.</p>
                </div>
              </div>
              <div className="step">
                <div className="num">04</div>
                <div>
                  <h3>Aligner Journey</h3>
                  <p>Begin treatment with professional guidance and scheduled follow-ups.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OFFER */}
        <section className="sec offer-sec" id="offer">
          <div className="wrap offer-card">
            <div className="rv">
              <span className="kicker">BOOK YOUR VISIT</span>
              <h2>START YOUR ALIGNER JOURNEY</h2>
              <p className="offer-lead">
                Meet the dental team, share your smile concerns and find out whether Clear Aligners may be the right option for you.
              </p>
            </div>
            <div className="inc-box rv" style={{ '--i': 1 } as React.CSSProperties}>
              <h3>AT YOUR CONSULTATION</h3>
              <ul>
                <li><span><svg><use href="#i-tooth"/></svg></span>Smile and dental check</li>
                <li><span><svg><use href="#i-chat"/></svg></span>Discussion of your concerns</li>
                <li><span><svg><use href="#i-cal"/></svg></span>Guidance on the next steps</li>
              </ul>
              <a className="btn btn-light js-wa" href={waURL} target="_blank" rel="noopener noreferrer">
                <svg><use href="#i-wa"/></svg>Book Your Consultation
              </a>
            </div>
          </div>
        </section>

        {/* WHY PRISTINE */}
        <section className="sec" id="clinic">
          <div className="wrap">
            <div className="sec-head rv">
              <span className="kicker">OUR CLINIC</span>
              <h2>Why Choose Pristine Dental Clinic?</h2>
              <p>Care that is personal, clear and comfortable, from your first visit to every follow-up.</p>
            </div>
            <div className="why-grid">
              <div className="why rv" style={{ '--i': 0 } as React.CSSProperties}>
                <div className="ico"><svg><use href="#i-user"/></svg></div>
                <div>
                  <h3>Personalised Consultation</h3>
                  <p>Time to understand your concerns and goals.</p>
                </div>
              </div>
              <div className="why rv" style={{ '--i': 1 } as React.CSSProperties}>
                <div className="ico"><svg><use href="#i-cpu"/></svg></div>
                <div>
                  <h3>Modern Dental Technology</h3>
                  <p>Digital X-ray and 3D scanning for precise records.</p>
                </div>
              </div>
              <div className="why rv" style={{ '--i': 2 } as React.CSSProperties}>
                <div className="ico"><svg><use href="#i-chat"/></svg></div>
                <div>
                  <h3>Clear Communication</h3>
                  <p>Every step and option explained in simple words.</p>
                </div>
              </div>
              <div className="why rv" style={{ '--i': 3 } as React.CSSProperties}>
                <div className="ico"><svg><use href="#i-heart"/></svg></div>
                <div>
                  <h3>Patient-Focused Care</h3>
                  <p>Your comfort and hygiene come first.</p>
                </div>
              </div>
              <div className="why rv" style={{ '--i': 4 } as React.CSSProperties}>
                <div className="ico"><svg><use href="#i-pin"/></svg></div>
                <div>
                  <h3>Convenient Chandkheda Location</h3>
                  <p>Easy to reach on Sneh Plaza Road.</p>
                </div>
              </div>
              <div className="why rv" style={{ '--i': 5 } as React.CSSProperties}>
                <div className="ico"><svg><use href="#i-cal"/></svg></div>
                <div>
                  <h3>Professional Follow-Up Support</h3>
                  <p>Scheduled check-ups throughout your treatment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec faq-sec" id="faq">
          <div className="wrap">
            <div className="sec-head center rv">
              <span className="kicker">FAQ</span>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faq" id="faqList">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className={`qa rv ${isOpen ? 'open' : ''}`}>
                    <button
                      aria-expanded={isOpen}
                      onClick={() => toggleFaq(index)}
                    >
                      <span>{faq.q}</span>
                      <span className="pm"><svg><use href="#i-plus"/></svg></span>
                    </button>
                    <div className="ans">
                      <div>
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final">
          <div className="wrap">
            <div className="final-card rv">
              <h2>Ready to Take the First Step Towards Your New Smile?</h2>
              <p>Book your Clear Aligner consultation and understand which treatment option may be suitable for your smile.</p>
              <div className="cta-row">
                <a className="btn btn-wa js-wa" href={waURL} target="_blank" rel="noopener noreferrer">
                  <svg><use href="#i-wa"/></svg>Book on WhatsApp
                </a>
                <a className="btn btn-ghost" href="tel:+919909336825">
                  <svg><use href="#i-phone"/></svg>Call the Clinic
                </a>
              </div>
              <div className="addr-line">
                <svg><use href="#i-pin"/></svg>
                Ground Floor, Shop 03–04, Madhuram Flora, Sneh Plaza Road, Chandkheda, Ahmedabad
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="sec" id="contact" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head rv">
              <span className="kicker">VISIT US</span>
              <h2>Contact &amp; Location</h2>
            </div>
            <div className="contact-grid">
              <div className="c-card rv">
                <h3>DR. PARIKH’S PRISTINE DENTAL CLINIC</h3>
                <div className="c-row">
                  <div className="ico"><svg><use href="#i-pin"/></svg></div>
                  <div>
                    <small>ADDRESS</small>
                    <address>
                      Ground Floor, Shop 03–04,<br/>
                      Madhuram Flora,<br/>
                      Sneh Plaza Road,<br/>
                      Chandkheda, Ahmedabad
                    </address>
                  </div>
                </div>
                <div className="c-row">
                  <div className="ico"><svg><use href="#i-phone"/></svg></div>
                  <div>
                    <small>PHONE</small>
                    <a href="tel:+919909336825">+91 99093 36825</a><br/>
                    <a href="tel:+919998336825">+91 99983 36825</a>
                  </div>
                </div>
                <div className="c-row">
                  <div className="ico"><svg><use href="#i-globe"/></svg></div>
                  <div>
                    <small>WEBSITE</small>
                    <a href="https://pristinedental.in" target="_blank" rel="noopener noreferrer">pristinedental.in</a>
                  </div>
                </div>
                <div className="c-row">
                  <div className="ico"><svg><use href="#i-ig"/></svg></div>
                  <div>
                    <small>INSTAGRAM</small>
                    <a href="https://www.instagram.com/pristine.dental.clinic/" target="_blank" rel="noopener noreferrer">@pristine.dental.clinic</a>
                  </div>
                </div>
              </div>
              <div className="map rv" style={{ '--i': 1 } as React.CSSProperties} role="img" aria-label="Map placeholder showing clinic location in Chandkheda">
                <svg className="grid" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect width="600" height="420" fill="#EAF4F1"/>
                  <g fill="#DCEDE7">
                    <rect x="30" y="30" width="150" height="110" rx="10"/>
                    <rect x="220" y="30" width="120" height="80" rx="10"/>
                    <rect x="380" y="20" width="190" height="130" rx="10"/>
                    <rect x="30" y="190" width="110" height="170" rx="10"/>
                    <rect x="400" y="200" width="170" height="90" rx="10"/>
                    <rect x="190" y="300" width="160" height="100" rx="10"/>
                    <rect x="420" y="330" width="150" height="80" rx="10"/>
                  </g>
                  <path d="M0 165 C 150 150, 300 175, 600 160" stroke="#fff" strokeWidth="22" fill="none"/>
                  <path d="M175 0 C 185 140, 165 280, 190 420" stroke="#fff" strokeWidth="16" fill="none"/>
                  <path d="M360 0 C 370 120, 380 260, 380 420" stroke="#fff" strokeWidth="14" fill="none"/>
                  <path d="M0 300 C 200 280, 380 300, 600 310" stroke="#fff" strokeWidth="12" fill="none"/>
                  <path d="M0 165 C 150 150, 300 175, 600 160" stroke="#62D4C4" strokeWidth="2" strokeDasharray="6 8" fill="none" opacity=".6"/>
                  <circle cx="300" cy="185" r="70" fill="#62D4C4" opacity=".12"/>
                  <text x="410" y="185" fontFamily="'Anek Latin', 'Anek Gujarati', sans-serif" fontSize="12" fill="#6b8a82">Sneh Plaza Road</text>
                </svg>
                <div className="pin">
                  <span className="dot"><svg><use href="#i-tooth"/></svg></span>
                  <span className="pulse"></span>
                </div>
                <div className="map-card">
                  <div>
                    <b>Madhuram Flora</b>
                    <small>Chandkheda, Ahmedabad</small>
                  </div>
                  <a
                    className="btn btn-wa"
                    href="https://www.google.com/maps/search/?api=1&query=Dr.+Parikh%27s+Pristine+Dental+Clinic+Madhuram+Flora+Sneh+Plaza+Road+Chandkheda+Ahmedabad"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg><use href="#i-pin"/></svg>Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <h4>Dr. Parikh’s Pristine Dental Clinic</h4>
              <p>Ground Floor, Shop 03–04, Madhuram Flora, Sneh Plaza Road, Chandkheda, Ahmedabad</p>
              <p style={{ marginTop: '12px' }}>
                <a href="tel:+919909336825">9909336825</a> &nbsp;|&nbsp; <a href="tel:+919998336825">9998336825</a>
              </p>
              <p style={{ marginTop: '6px' }}>
                <a href="https://pristinedental.in" target="_blank" rel="noopener noreferrer">pristinedental.in</a> &nbsp;|&nbsp; <a href="https://www.instagram.com/pristine.dental.clinic/" target="_blank" rel="noopener noreferrer">@pristine.dental.clinic</a>
              </p>
            </div>
            <div>
              <h5>QUICK LINKS</h5>
              <ul>
                <li><a href="#why" onClick={(e) => handleNavClick(e, "#why")}>Why Aligners</a></li>
                <li><a href="#process" onClick={(e) => handleNavClick(e, "#process")}>Process</a></li>
                <li><a href="#offer" onClick={(e) => handleNavClick(e, "#offer")}>Book Consultation</a></li>
                <li><a href="#faq" onClick={(e) => handleNavClick(e, "#faq")}>FAQ</a></li>
                <li><a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h5>BOOK NOW</h5>
              <ul>
                <li><a className="js-wa" href={waURL} target="_blank" rel="noopener noreferrer">WhatsApp Booking</a></li>
                <li><a href="tel:+919909336825">Call the Clinic</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} Dr. Parikh’s Pristine Dental Clinic. All rights reserved.</span>
            <span>Nurturing Smiles!</span>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTON */}
      <a className="fab js-wa" href={waURL} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg><use href="#i-wa"/></svg>
      </a>

      {/* STICKY BOTTOM MOBILE BAR */}
      <div className={`mbar ${showMobileBar ? 'show' : ''}`} id="mbar">
        <a className="btn btn-ghost" href="tel:+919909336825">
          <svg><use href="#i-phone"/></svg>Call
        </a>
        <a className="btn btn-wa js-wa" href={waURL} target="_blank" rel="noopener noreferrer">
          <svg><use href="#i-wa"/></svg>Book on WhatsApp
        </a>
      </div>
    </>
  );
}
