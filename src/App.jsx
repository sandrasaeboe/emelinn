import React, { useEffect, useRef, useState } from 'react';
import './App.css';

/* ── Reveal-on-scroll wrapper ────────────────────────────────────────────── */
function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.transitionDelay = `${delay}ms`; el.classList.add('in'); } },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>;
}

/* ── Nav ─────────────────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className={`nav ${open ? 'nav--menu-open' : ''}`}>
      <a href="#top" className="nav__name">Emelinn Heikkinen</a>
      <nav className={`nav__menu ${open ? 'is-open' : ''}`}>
        <a href="#work" onClick={() => setOpen(false)}>Work</a>
        <a href="#booking-info" onClick={() => setOpen(false)}>Booking info</a>
        <a href="#book" onClick={() => setOpen(false)}>Book</a>
      </nav>
      <button className="nav__toggle mono" onClick={() => setOpen(o => !o)} aria-label="Menu">
        [ {open ? 'Close' : 'Menu'} ]
      </button>
    </header>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__top">
        <span className="mono">Tattoo Artist</span>
        <span className="mono">Stockholm</span>
      </div>

      <h1 className="hero__title">
        <span className="hero__line">EMELINN </span>
        <span className="hero__line hero__line--ital">- STUDIO FÖR EVIGT</span>
      </h1>

      <div className="hero__bottom">
        <p className="hero__lede">
          Text som beskriver kort evt stil etc.
          By appointment only.
        </p>
        <a href="#book" className="link-arrow">How to book <i>→</i></a>
      </div>
    </section>
  );
}

/* ── Gallery photos (temporary stock images — swap for real work later) ──── */
const PIECES = [
  { id: '01', title: 'Fine line', img: 'https://images.unsplash.com/photo-1542727365-19732a80dcfd?w=800&q=80&auto=format&fit=crop' },
  { id: '02', title: 'Text', img: 'https://images.unsplash.com/photo-1604449325317-4967c715538a?w=800&q=80&auto=format&fit=crop' },
  { id: '03', title: 'Text', img: 'https://images.unsplash.com/photo-1542744383-8c330d91f4b1?w=800&q=80&auto=format&fit=crop' },
  { id: '04', title: 'Text', img: 'https://images.unsplash.com/photo-1547754145-ef9ff306e3f3?w=800&q=80&auto=format&fit=crop' },
  { id: '05', title: 'Text', img: 'https://images.unsplash.com/photo-1570168983832-8989dae1522e?w=800&q=80&auto=format&fit=crop' },
  { id: '06', title: 'Text', img: 'https://images.unsplash.com/photo-1643513456892-437e82e06f4a?w=800&q=80&auto=format&fit=crop' },
];

/* ── Work (horizontal scroll gallery, looping) ────────────────────────────── */
const LOOPED_PIECES = [0, 1, 2].flatMap((loop) =>
  PIECES.map((p) => ({ ...p, key: `${loop}-${p.id}` }))
);

function Work() {
  const stripRef = useRef(null);
  const setWidthRef = useRef(0);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const perSet = PIECES.length;

    const center = () => {
      const cards = el.querySelectorAll('.work__card');
      if (cards.length < perSet * 2) return;
      const setWidth = cards[perSet].offsetLeft - cards[0].offsetLeft;
      if (!setWidth) return;
      setWidthRef.current = setWidth;
      el.scrollLeft = setWidth;
    };
    center();

    const onScroll = () => {
      const setWidth = setWidthRef.current;
      if (!setWidth) return;
      if (el.scrollLeft < setWidth) {
        el.scrollLeft += setWidth;
      } else if (el.scrollLeft >= setWidth * 2) {
        el.scrollLeft -= setWidth;
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', center);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', center);
    };
  }, []);

  return (
    <section id="work" className="work">
      <Reveal className="sec-head">
        <span className="mono sec-head__tag">Selected work</span>
        <span className="mono sec-head__count">{String(PIECES.length).padStart(2, '0')} pieces</span>
      </Reveal>

      <div className="work__strip" ref={stripRef}>
        {LOOPED_PIECES.map((p, i) => (
          <Reveal as="div" key={p.key} className="work__card" delay={(i % PIECES.length) * 60}>
            <div className="work__card-frame">
              <span className="mono work__card-index">({p.id})</span>
              <img className="work__card-img" src={p.img} alt={p.title} loading="lazy" />
            </div>
            <div className="work__card-cap">
              <span className="work__card-title">{p.title}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Booking info ──────────────────────────────────────────────────────────── */
const STEPS = [
  { n: '01', t: 'Get in touch', d: 'Message with your idea, placement and size — via Instagram or email.' },
  { n: '02', t: 'Design', d: 'A sketch is drawn for your piece. You review it before the session.' },
  { n: '03', t: 'Text', d: 'Text beskrivning.' },
  { n: '04', t: 'Session', d: 'Text beskrivning. Aftercare guidance is included.' },
];
function BookingInfo() {
  return (
    <section id="booking-info" className="booking-info">
      <div className="booking-info__card">
        <Reveal as="p" className="ital booking-info__eyebrow">Text &amp; Text</Reveal>

        <Reveal as="h2" className="booking-info__mast">
          <span className="booking-info__mast-line">Booking</span>
        </Reveal>

        <ol className="booking-info__list">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} className="booking-info__item" delay={i * 70}>
              <span className="booking-info__n mono">{s.n}</span>
              <div className="booking-info__text">
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Book (informational — no form) ───────────────────────────────────────── */
function Book() {
  return (
    <section id="book" className="book">
      <div className="book__intro">
        <p className="book__note">
          Bookings are handled over Instagram or email,
          just send a message.
        </p>
      </div>

      <div className="book__contact">
        <a
          href="https://www.instagram.com/emelinn"
          className="book__contact-row"
          target="_blank"
          rel="noreferrer"
        >
          <span className="mono">Instagram</span>
          <span className="book__contact-value">@emelinn <i>→</i></span>
        </a>
        <a href="mailto:emelinnemelinn@gmail.com" className="book__contact-row">
          <span className="mono">Email</span>
          <span className="book__contact-value">emelinnemelinn@gmail.com <i>→</i></span>
        </a>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <BookingInfo />
        <Book />
      </main>
    </>
  );
}
