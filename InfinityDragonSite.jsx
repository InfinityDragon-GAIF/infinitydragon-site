import React, { useState, useEffect, useMemo, useRef } from "react";

/*
  infinitydragon.ai — Governed AI Infinity Framework
  IP: Andre Thompson Sr. / AI Infinity Group LLC
  Five integrated sections on one surface:
    1. Manifesto / Governing Thesis
    2. Live GAIF Audit Demo (9-layer scoring, γ, plateau-lock)
    3. InfinityGPT Architecture (143 elements, 20 sections)
    4. Certification & Pricing
    5. <a href="#tts" style={navLink}>Threat Surface</a>
          <a href="/education" style={navLink}>Academy</a>
*/

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const C = {
  ink: "#0a0908",
  inkSoft: "#11100e",
  paper: "#f6f1e9",
  bone: "#e8dfd1",
  rule: "rgba(246, 241, 233, 0.08)",
  ruleStrong: "rgba(246, 241, 233, 0.18)",
  text: "#f6f1e9",
  textMute: "rgba(246, 241, 233, 0.6)",
  textFaint: "rgba(246, 241, 233, 0.4)",
  gold: "#d4a96a",
  goldDim: "rgba(212, 169, 106, 0.18)",
  emerald: "#5fb893",
  crimson: "#d65d4a",
  amber: "#e6a93d",
};

const FONT = {
  display: "'Fraunces', Georgia, serif",
  body: "'Inter Tight', -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// ─── GAIF CANONICAL DATA ────────────────────────────────────────────────────
const LAYERS = [
  { id: "WHO",    n: "L₁", role: "Identity & Ownership Attach",   theta: 0.95 },
  { id: "WHAT",   n: "L₂", role: "Claim Normalization",            theta: 0.95 },
  { id: "WHICH",  n: "L₃", role: "Relevance Routing (argmax)",     theta: 0.95 },
  { id: "WHY",    n: "L₄", role: "Evidence Binding",               theta: 0.97 },
  { id: "WHEN",   n: "L₅", role: "Temporal Consistency",           theta: 0.95 },
  { id: "WHERE",  n: "L₆", role: "Context Fit",                    theta: 0.95 },
  { id: "HOW",    n: "L₇", role: "Verify Against Evidence",        theta: 0.96 },
  { id: "IF",     n: "L₈", role: "Scenario & Risk Mapping",        theta: 0.94 },
  { id: "IMPACT", n: "L₉", role: "Outcome Projection",             theta: 0.95 },
];

const SECTIONS_20 = [
  { s: "S1",  name: "Core",          n: 10 },
  { s: "S2",  name: "Convergence",   n: 5  },
  { s: "S3",  name: "Filters",       n: 5  },
  { s: "S4",  name: "Cognitive",     n: 6  },
  { s: "S5",  name: "Continuity",    n: 3  },
  { s: "S6",  name: "Ethics",        n: 5  },
  { s: "S7",  name: "Rhetoric",      n: 5  },
  { s: "S8",  name: "Drift",         n: 4  },
  { s: "S9",  name: "FUD",           n: 4  },
  { s: "S10", name: "Patterns",      n: 4  },
  { s: "S11", name: "Canon",         n: 7  },
  { s: "S12", name: "Audit",         n: 6  },
  { s: "S13", name: "Execution",     n: 6  },
  { s: "S14", name: "Safety",        n: 5  },
  { s: "S15", name: "Evidence",      n: 10 },
  { s: "S16", name: "Observability", n: 6  },
  { s: "S17", name: "Security",      n: 6  },
  { s: "S18", name: "Quantum",       n: 8  },
  { s: "S19", name: "Code",          n: 21 },
  { s: "S20", name: "Workflow",      n: 17 },
];

const TIERS = [
  {
    name: "Civic",
    sub: "Municipal & non-profit",
    price: "$12k",
    cadence: "/ year",
    bullets: [
      "GAIF Layer 1–9 audit on a single AI deployment",
      "Plateau-Lock certification (γ ≥ 0.995)",
      "Quarterly drift re-audit",
      "Public-facing certification mark",
    ],
    accent: C.emerald,
  },
  {
    name: "Enterprise",
    sub: "Mid-market & regulated industries",
    price: "$48k",
    cadence: "/ year",
    bullets: [
      "Full 143-element governance audit",
      "GAIF-IASA security architecture review",
      "Token Threat Surface™ assessment",
      "ACA execution-gate integration",
      "Monthly drift re-audit + incident response",
    ],
    accent: C.gold,
    featured: true,
  },
  {
    name: "Sovereign",
    sub: "Federal, large enterprise, and defense",
    price: "Custom",
    cadence: "engagement",
    bullets: [
      "Multi-deployment governance architecture",
      "GIOS deployment + ACA white-glove integration",
      "Quantum readiness layer (S18, 8 elements)",
      "On-site governance officer placement",
      "Direct line to founder",
    ],
    accent: C.crimson,
  },
];

const TTS_ZONES = [
  { z: "Z1", name: "Input Zone",      desc: "Raw token ingestion. Prompt injection, jailbreak attempts, adversarial inputs land here first." },
  { z: "Z2", name: "Inference Zone",  desc: "Model reasoning. Hallucination, drift, sycophancy emerge in this zone — the most opaque link." },
  { z: "Z3", name: "Generation Zone", desc: "Code, text, and artifact synthesis. Where the Infinity Cyber Security Dragon™ stands guard." },
  { z: "Z4", name: "Execution Zone",  desc: "Tool use, file writes, network calls. ACA's seven gates govern this zone end-to-end." },
  { z: "Z5", name: "Delivery Zone",   desc: "Final output. Plateau-Lock check (γ ≥ 0.995). Without it, no governance claim is real." },
];

// ─── HOOKS ──────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

// ─── ROOT ───────────────────────────────────────────────────────────────────
export default function InfinityDragonSite() {
  return (
    <div style={{
      background: C.ink,
      color: C.text,
      fontFamily: FONT.body,
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <Nav />
      <Hero />
      <Manifesto />
      <AuditDemo />
      <Architecture />
      <Pricing />
      <TokenThreatSurface />
      <Footer />
      <GlobalStyles />
    </div>
  );
}

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; }
      ::selection { background: ${C.gold}; color: ${C.ink}; }
      html { scroll-behavior: smooth; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes drift {
        0%, 100% { transform: translate(0,0); }
        50% { transform: translate(2%, 1%); }
      }
      @keyframes glow {
        0%, 100% { opacity: 0.45; }
        50% { opacity: 0.85; }
      }
      @keyframes scan {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(2400%); }
      }
      .reveal { opacity: 0; }
      .reveal.in { animation: fadeUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

      .grain {
        position: fixed; inset: 0; pointer-events: none; z-index: 1;
        opacity: 0.035; mix-blend-mode: overlay;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      }
    `}</style>
  );
}

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
      background: scrolled ? "rgba(10, 9, 8, 0.78)" : "transparent",
      borderBottom: scrolled ? `1px solid ${C.rule}` : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "16px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#top" style={{
          fontFamily: FONT.display, fontSize: 18, fontWeight: 600,
          color: C.text, textDecoration: "none", letterSpacing: "-0.01em",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{
            width: 26, height: 26, borderRadius: "50%",
            border: `1px solid ${C.gold}`,
            display: "grid", placeItems: "center",
            color: C.gold, fontSize: 14,
            fontFamily: FONT.mono,
          }}>∞</span>
          <span>infinitydragon</span>
          <span style={{ color: C.textFaint, fontSize: 14 }}>.ai</span>
        </a>
        <div style={{
          display: "flex", gap: 28, alignItems: "center",
          fontFamily: FONT.mono, fontSize: 11,
          letterSpacing: "0.08em", textTransform: "uppercase",
        }} className="nav-links">
          <a href="#manifesto" style={navLink}>Thesis</a>
          <a href="#audit" style={navLink}>Audit</a>
          <a href="#architecture" style={navLink}>Architecture</a>
          <a href="#pricing" style={navLink}>Certify</a>
          <a href="#tts" style={navLink}>Threat Surface</a>
          <a href="mailto:andre@infinitydragon.ai" style={{
            ...navLink,
            border: `1px solid ${C.gold}`,
            color: C.gold,
            padding: "8px 14px",
          }}>Contact</a>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .nav-links a:not(:last-child) { display: none; }
        }
      `}</style>
    </nav>
  );
}

const navLink = {
  color: C.textMute, textDecoration: "none",
  transition: "color 0.2s",
};

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      padding: "140px 28px 100px",
      borderBottom: `1px solid ${C.rule}`,
      overflow: "hidden",
    }}>
      <div className="grain" />

      {/* atmospheric gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 1200px 800px at 70% 20%, rgba(212, 169, 106, 0.08), transparent 60%),
                     radial-gradient(ellipse 800px 600px at 20% 80%, rgba(95, 184, 147, 0.05), transparent 60%)`,
        animation: "drift 18s ease-in-out infinite",
      }} />

      <div style={{
        maxWidth: 1280, margin: "0 auto", width: "100%",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          fontFamily: FONT.mono, fontSize: 11,
          color: C.gold, letterSpacing: "0.18em",
          textTransform: "uppercase", marginBottom: 28,
        }}>
          ∞ &nbsp; AI Infinity Research & Development Institute &nbsp; / &nbsp; Albany, Georgia
        </div>

        <h1 style={{
          fontFamily: FONT.display,
          fontSize: "clamp(48px, 8vw, 116px)",
          lineHeight: 0.92,
          letterSpacing: "-0.035em",
          fontWeight: 400,
          margin: "0 0 32px",
          maxWidth: 1100,
        }}>
          <span style={{ fontStyle: "italic", color: C.gold }}>Governed</span> Intelligence
          <br />for the age of
          <br />artificial intelligence.
        </h1>

        <p style={{
          fontSize: 20, lineHeight: 1.55,
          color: C.textMute, maxWidth: 620,
          margin: "0 0 48px", fontWeight: 300,
        }}>
          The Governed AI Infinity Framework — a 143-element architecture that
          governs AI <em style={{ color: C.text, fontStyle: "italic" }}>output</em>,
          not just the people around it. From the token up.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="#audit" style={{
            background: C.gold, color: C.ink,
            padding: "16px 28px",
            fontFamily: FONT.mono, fontSize: 12,
            letterSpacing: "0.12em", textTransform: "uppercase",
            textDecoration: "none", fontWeight: 600,
            borderRadius: 0,
          }}>Run a live audit →</a>
          <a href="#manifesto" style={{
            background: "transparent", color: C.text,
            padding: "16px 28px",
            fontFamily: FONT.mono, fontSize: 12,
            letterSpacing: "0.12em", textTransform: "uppercase",
            textDecoration: "none", fontWeight: 500,
            border: `1px solid ${C.ruleStrong}`,
          }}>Read the thesis</a>
        </div>

        {/* hero stats */}
        <div style={{
          marginTop: 100, display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 32, paddingTop: 40, borderTop: `1px solid ${C.rule}`,
        }}>
          <Stat n="143" label="Governance Elements" />
          <Stat n="20" label="Canonical Sections" />
          <Stat n="9" label="Pipeline Layers" />
          <Stat n="γ ≥ 0.995" label="Plateau-Lock Threshold" gold />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label, gold }) {
  return (
    <div>
      <div style={{
        fontFamily: FONT.display,
        fontSize: 38, fontWeight: 500,
        color: gold ? C.gold : C.text,
        letterSpacing: "-0.02em",
        marginBottom: 8,
      }}>{n}</div>
      <div style={{
        fontFamily: FONT.mono, fontSize: 10,
        color: C.textFaint, letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}>{label}</div>
    </div>
  );
}

// ─── MANIFESTO ──────────────────────────────────────────────────────────────
function Manifesto() {
  const [ref, shown] = useReveal();
  return (
    <section id="manifesto" ref={ref} className={`reveal ${shown ? "in" : ""}`} style={{
      padding: "140px 28px",
      borderBottom: `1px solid ${C.rule}`,
      maxWidth: 1280, margin: "0 auto",
    }}>
      <SectionLabel num="01" title="The Governing Thesis" />

      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
        gap: 80, marginTop: 60,
      }} className="manifesto-grid">

        <div>
          <div style={{
            fontFamily: FONT.mono, fontSize: 11,
            color: C.gold, letterSpacing: "0.16em",
            textTransform: "uppercase", marginBottom: 24,
          }}>γ = 0.998 ∞✓</div>
          <h2 style={{
            fontFamily: FONT.display,
            fontSize: "clamp(28px, 3.4vw, 44px)",
            lineHeight: 1.05, fontWeight: 400,
            letterSpacing: "-0.02em", margin: 0,
          }}>
            "AI security is difficult to achieve when AI is{" "}
            <em style={{ fontStyle: "italic", color: C.gold }}>ungoverned</em>."
          </h2>
        </div>

        <div style={{ fontSize: 18, lineHeight: 1.7, color: C.textMute, fontWeight: 300 }}>
          <p style={{ margin: "0 0 24px" }}>
            Governed AI is more controllable, more auditable, and more defensible.
            Ungoverned AI creates a powerful threat vector for cybercrime —
            because risk begins at the token level.
          </p>
          <p style={{ margin: "0 0 24px" }}>
            Effective AI governance reduces that risk, making AI security
            increasingly achievable from the token up.
          </p>
          <p style={{ margin: 0, color: C.text }}>
            <span style={{
              fontFamily: FONT.mono, fontSize: 13,
              color: C.gold, letterSpacing: "0.06em",
            }}>GI = CL∞(L₉ ∘ L₈ ∘ … ∘ L₁(AI(x))) &nbsp; s.t. E=L, γ ≥ 0.995</span>
          </p>
        </div>
      </div>

      {/* three pillars */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 1, background: C.ruleStrong,
        marginTop: 100,
        border: `1px solid ${C.ruleStrong}`,
      }}>
        {[
          { k: "E = L", t: "Every Layer Must Execute", b: "No skipping. No optional gates. The defining canon." },
          { k: "CL∞", t: "Convergence Lock", b: "min(T(x), E(x), C(x)) ≥ 0.995, or the output does not ship." },
          { k: "∞✓", t: "Plateau-Lock Seal", b: "Final delivery mark. Without it, governance has not occurred." },
        ].map((p, i) => (
          <div key={i} style={{ background: C.ink, padding: "44px 36px" }}>
            <div style={{
              fontFamily: FONT.mono, fontSize: 24,
              color: C.gold, marginBottom: 20, letterSpacing: "0.04em",
            }}>{p.k}</div>
            <div style={{
              fontFamily: FONT.display, fontSize: 22,
              fontWeight: 500, marginBottom: 12,
              letterSpacing: "-0.01em",
            }}>{p.t}</div>
            <div style={{ color: C.textMute, fontSize: 15, lineHeight: 1.55 }}>
              {p.b}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 880px) {
          .manifesto-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function SectionLabel({ num, title }) {
  return (
    <div style={{
      display: "flex", alignItems: "baseline", gap: 24,
      paddingBottom: 24, borderBottom: `1px solid ${C.rule}`,
    }}>
      <span style={{
        fontFamily: FONT.mono, fontSize: 11,
        color: C.gold, letterSpacing: "0.18em",
      }}>{num}</span>
      <span style={{
        fontFamily: FONT.mono, fontSize: 11,
        color: C.textFaint, letterSpacing: "0.16em",
        textTransform: "uppercase",
      }}>{title}</span>
    </div>
  );
}

// ─── AUDIT DEMO ─────────────────────────────────────────────────────────────
const SAMPLE_QUERIES = [
  {
    id: "q1",
    label: "Plateau-Lock Pass",
    text: "Albany, Georgia issued a Grand Jury Presentment recommending an AI Governance Advisory Committee.",
    scores: { WHO: 0.998, WHAT: 0.996, WHICH: 0.995, WHY: 0.985, WHEN: 0.997, WHERE: 0.998, HOW: 0.978, IF: 0.972, IMPACT: 0.985 },
  },
  {
    id: "q2",
    label: "HALT — Evidence Fail",
    text: "The U.S. passed the Algorithmic Accountability Act of 2023, mandating federal AI certification.",
    scores: { WHO: 0.95, WHAT: 0.42, WHICH: 0.72, WHY: 0.10, WHEN: 0.44, WHERE: 0.78, HOW: 0.18, IF: 0.55, IMPACT: 0.32 },
  },
  {
    id: "q3",
    label: "Drift Detection",
    text: "Quantum-encrypted blockchain AI guarantees zero hallucinations through sovereign neural mesh consensus.",
    scores: { WHO: 0.62, WHAT: 0.31, WHICH: 0.45, WHY: 0.08, WHEN: 0.71, WHERE: 0.40, HOW: 0.12, IF: 0.28, IMPACT: 0.22 },
  },
];

function AuditDemo() {
  const [active, setActive] = useState(SAMPLE_QUERIES[0]);
  const [animKey, setAnimKey] = useState(0);

  const gamma = useMemo(() => {
    const vals = LAYERS.map(l => active.scores[l.id]);
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }, [active]);

  const T = (active.scores.WHO + active.scores.WHAT + active.scores.WHICH) / 3;
  const E = (active.scores.WHY + active.scores.HOW + active.scores.IMPACT) / 3;
  const Cv = (active.scores.WHEN + active.scores.WHERE + active.scores.IF) / 3;
  const cl_inf = Math.min(T, E, Cv);

  const passed = gamma >= 0.995 && cl_inf >= 0.995;
  const status = passed ? "PLATEAU-LOCK ∞✓" : "HALT · BELOW THRESHOLD";

  const onPick = (q) => { setActive(q); setAnimKey(k => k + 1); };

  return (
    <section id="audit" style={{
      padding: "140px 28px",
      borderBottom: `1px solid ${C.rule}`,
      background: C.inkSoft,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel num="02" title="Live Governance Pipeline" />

        <h2 style={{
          fontFamily: FONT.display,
          fontSize: "clamp(36px, 5vw, 64px)",
          lineHeight: 1, fontWeight: 400,
          letterSpacing: "-0.025em",
          margin: "48px 0 24px", maxWidth: 900,
        }}>
          Watch a claim move through nine layers and{" "}
          <em style={{ fontStyle: "italic", color: C.gold }}>plateau-lock or halt</em>.
        </h2>

        <p style={{ color: C.textMute, fontSize: 17, maxWidth: 700, lineHeight: 1.6, margin: "0 0 56px" }}>
          Three sample claims. Each runs through GAIF's compositional pipeline — WHO,
          WHAT, WHICH, WHY, WHEN, WHERE, HOW, IF, IMPACT — and converges on a γ score.
          Below 0.995, the framework halts. No exceptions.
        </p>

        {/* query selector */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 12, marginBottom: 40,
        }}>
          {SAMPLE_QUERIES.map(q => (
            <button key={q.id} onClick={() => onPick(q)} style={{
              background: active.id === q.id ? C.gold : "transparent",
              color: active.id === q.id ? C.ink : C.text,
              border: `1px solid ${active.id === q.id ? C.gold : C.ruleStrong}`,
              padding: "14px 18px",
              fontFamily: FONT.mono, fontSize: 11,
              letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer", textAlign: "left",
              fontWeight: active.id === q.id ? 600 : 400,
              transition: "all 0.2s",
            }}>{q.label}</button>
          ))}
        </div>

        <div style={{
          padding: "32px 36px",
          border: `1px solid ${C.ruleStrong}`,
          background: C.ink,
          marginBottom: 32,
        }}>
          <div style={{
            fontFamily: FONT.mono, fontSize: 10,
            color: C.textFaint, letterSpacing: "0.16em",
            textTransform: "uppercase", marginBottom: 12,
          }}>Input Claim</div>
          <p style={{
            fontFamily: FONT.display, fontSize: 22,
            lineHeight: 1.4, fontWeight: 400, margin: 0,
            fontStyle: "italic", color: C.text,
          }}>"{active.text}"</p>
        </div>

        {/* layer cascade */}
        <div key={animKey} style={{ display: "grid", gap: 4 }}>
          {LAYERS.map((l, i) => {
            const score = active.scores[l.id];
            const pass = score >= l.theta;
            const pct = Math.min(100, Math.max(0, score * 100));
            return (
              <div key={l.id} className="reveal in" style={{
                animationDelay: `${i * 70}ms`,
                animationFillMode: "both",
                display: "grid",
                gridTemplateColumns: "60px 1fr 90px",
                alignItems: "center",
                padding: "18px 24px",
                background: C.ink,
                border: `1px solid ${pass ? "rgba(95, 184, 147, 0.25)" : "rgba(214, 93, 74, 0.25)"}`,
                gap: 24,
              }}>
                <div style={{
                  fontFamily: FONT.mono, fontSize: 13,
                  color: pass ? C.emerald : C.crimson,
                  letterSpacing: "0.04em",
                }}>{l.n}</div>
                <div>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "baseline", marginBottom: 8, gap: 16,
                  }}>
                    <div>
                      <span style={{
                        fontFamily: FONT.display, fontSize: 18,
                        fontWeight: 500, marginRight: 14,
                      }}>{l.id}</span>
                      <span style={{
                        fontFamily: FONT.body, fontSize: 13,
                        color: C.textMute,
                      }}>{l.role}</span>
                    </div>
                    <span style={{
                      fontFamily: FONT.mono, fontSize: 11,
                      color: C.textFaint, letterSpacing: "0.08em",
                    }}>θ ≥ {l.theta}</span>
                  </div>
                  <div style={{
                    height: 3, background: C.rule,
                    position: "relative", overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", left: 0, top: 0, bottom: 0,
                      width: `${pct}%`,
                      background: pass ? C.emerald : C.crimson,
                      transition: "width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    }} />
                  </div>
                </div>
                <div style={{
                  textAlign: "right",
                  fontFamily: FONT.mono, fontSize: 16,
                  color: pass ? C.emerald : C.crimson,
                  fontWeight: 600,
                }}>{score.toFixed(3)}</div>
              </div>
            );
          })}
        </div>

        {/* convergence readout */}
        <div style={{
          marginTop: 4,
          padding: "32px 36px",
          background: passed ? "rgba(95, 184, 147, 0.08)" : "rgba(214, 93, 74, 0.08)",
          border: `1px solid ${passed ? "rgba(95, 184, 147, 0.4)" : "rgba(214, 93, 74, 0.4)"}`,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 32, alignItems: "center",
        }}>
          <ConvStat label="γ (gamma)" value={gamma.toFixed(4)} ok={gamma >= 0.995} />
          <ConvStat label="CL∞" value={cl_inf.toFixed(4)} ok={cl_inf >= 0.995} />
          <ConvStat label="T(x)" value={T.toFixed(3)} muted />
          <ConvStat label="E(x)" value={E.toFixed(3)} muted />
          <ConvStat label="C(x)" value={Cv.toFixed(3)} muted />
          <div style={{
            fontFamily: FONT.mono, fontSize: 14,
            color: passed ? C.emerald : C.crimson,
            letterSpacing: "0.1em", fontWeight: 600,
            textAlign: "right",
          }}>{status}</div>
        </div>
      </div>
    </section>
  );
}

function ConvStat({ label, value, ok, muted }) {
  return (
    <div>
      <div style={{
        fontFamily: FONT.mono, fontSize: 10,
        color: C.textFaint, letterSpacing: "0.14em",
        textTransform: "uppercase", marginBottom: 6,
      }}>{label}</div>
      <div style={{
        fontFamily: FONT.display, fontSize: 26, fontWeight: 500,
        color: muted ? C.text : (ok ? C.emerald : C.crimson),
        letterSpacing: "-0.01em",
      }}>{value}</div>
    </div>
  );
}

// ─── ARCHITECTURE ───────────────────────────────────────────────────────────
function Architecture() {
  const [hover, setHover] = useState(null);
  return (
    <section id="architecture" style={{
      padding: "140px 28px",
      borderBottom: `1px solid ${C.rule}`,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel num="03" title="InfinityGPT Architecture" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 80, marginTop: 60, alignItems: "start",
        }} className="arch-grid">
          <div>
            <h2 style={{
              fontFamily: FONT.display,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1, fontWeight: 400,
              letterSpacing: "-0.025em",
              margin: "0 0 32px",
            }}>
              <em style={{ fontStyle: "italic", color: C.gold }}>143 elements.</em>
              <br />20 sections.
              <br />One pipeline.
            </h2>
            <p style={{ color: C.textMute, fontSize: 17, lineHeight: 1.65, margin: 0 }}>
              The full GAIF stack is not a checklist — it is a compositional architecture.
              Every section serves a defined function. Every element is enforced by E=L.
              No layer is optional. No element is decorative. The Token Threat Surface™ —
              from input through delivery — is governed end-to-end.
            </p>

            <div style={{
              marginTop: 48, padding: "28px 32px",
              background: C.inkSoft, border: `1px solid ${C.ruleStrong}`,
            }}>
              <div style={{
                fontFamily: FONT.mono, fontSize: 11,
                color: C.gold, letterSpacing: "0.14em",
                textTransform: "uppercase", marginBottom: 16,
              }}>GAIF-IASA · Five Named Elements</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 14, color: C.textMute }}>
                {[
                  ["E53",  "Infinity Cyber Security Dragon™"],
                  ["E89",  "Privacy & Confidentiality Layer"],
                  ["E95",  "GenAI Security-Posture Checklist"],
                  ["E100", "CBRN & Catastrophic Misuse Guardrails"],
                  ["S15",  "E89–E100 NIST-Aligned Block"],
                ].map(([k, v]) => (
                  <li key={k} style={{
                    padding: "10px 0",
                    borderBottom: `1px solid ${C.rule}`,
                    display: "flex", justifyContent: "space-between", gap: 16,
                  }}>
                    <span style={{ fontFamily: FONT.mono, color: C.gold }}>{k}</span>
                    <span style={{ textAlign: "right" }}>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* element grid */}
          <div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 4,
            }}>
              {SECTIONS_20.map(s => (
                <div key={s.s}
                  onMouseEnter={() => setHover(s.s)}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    aspectRatio: "1",
                    border: `1px solid ${hover === s.s ? C.gold : C.ruleStrong}`,
                    background: hover === s.s ? C.goldDim : "transparent",
                    padding: 14,
                    display: "flex", flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.18s",
                    cursor: "default",
                }}>
                  <div style={{
                    fontFamily: FONT.mono, fontSize: 11,
                    color: hover === s.s ? C.gold : C.textFaint,
                    letterSpacing: "0.06em",
                  }}>{s.s}</div>
                  <div>
                    <div style={{
                      fontFamily: FONT.display, fontSize: 20,
                      color: C.text, fontWeight: 500, marginBottom: 2,
                    }}>{s.n}</div>
                    <div style={{
                      fontFamily: FONT.body, fontSize: 11,
                      color: C.textMute,
                    }}>{s.name}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 16, fontFamily: FONT.mono,
              fontSize: 11, color: C.textFaint, letterSpacing: "0.1em",
            }}>
              TOTAL: {SECTIONS_20.reduce((a, b) => a + b.n, 0)} ELEMENTS &nbsp;·&nbsp; FRAMEWORK v∞
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .arch-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── PRICING ────────────────────────────────────────────────────────────────
function Pricing() {
  return (
    <section id="pricing" style={{
      padding: "140px 28px",
      borderBottom: `1px solid ${C.rule}`,
      background: C.inkSoft,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel num="04" title="Certification" />

        <h2 style={{
          fontFamily: FONT.display,
          fontSize: "clamp(36px, 5vw, 64px)",
          lineHeight: 1, fontWeight: 400,
          letterSpacing: "-0.025em",
          margin: "48px 0 24px", maxWidth: 900,
        }}>
          Become a <em style={{ fontStyle: "italic", color: C.gold }}>Plateau-Lock</em> certified deployment.
        </h2>
        <p style={{ color: C.textMute, fontSize: 17, lineHeight: 1.65, maxWidth: 700, margin: "0 0 60px" }}>
          Three engagement tiers. Each closes the gap between institutional governance
          and output governance. The Civic tier is the entry point for municipalities
          and HBCUs. Sovereign is reserved for federal and frontier deployments.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 4,
        }}>
          {TIERS.map((t, i) => (
            <div key={t.name} style={{
              background: C.ink,
              border: `1px solid ${t.featured ? t.accent : C.ruleStrong}`,
              padding: "40px 32px",
              position: "relative",
              boxShadow: t.featured ? `0 0 60px ${t.accent}22` : "none",
            }}>
              {t.featured && (
                <div style={{
                  position: "absolute", top: -1, right: -1,
                  background: t.accent, color: C.ink,
                  padding: "6px 12px",
                  fontFamily: FONT.mono, fontSize: 9,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  fontWeight: 600,
                }}>Most Adopted</div>
              )}
              <div style={{
                fontFamily: FONT.mono, fontSize: 11,
                color: t.accent, letterSpacing: "0.16em",
                textTransform: "uppercase", marginBottom: 12,
              }}>{t.name}</div>
              <div style={{
                fontFamily: FONT.body, fontSize: 13,
                color: C.textFaint, marginBottom: 32,
              }}>{t.sub}</div>
              <div style={{ marginBottom: 36, display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{
                  fontFamily: FONT.display, fontSize: 56, fontWeight: 500,
                  letterSpacing: "-0.03em", lineHeight: 1,
                }}>{t.price}</span>
                <span style={{ color: C.textFaint, fontSize: 14 }}>{t.cadence}</span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {t.bullets.map((b, j) => (
                  <li key={j} style={{
                    padding: "12px 0",
                    borderTop: j === 0 ? `1px solid ${C.rule}` : "none",
                    borderBottom: `1px solid ${C.rule}`,
                    fontSize: 14, color: C.textMute, lineHeight: 1.5,
                    display: "flex", gap: 12, alignItems: "flex-start",
                  }}>
                    <span style={{ color: t.accent, fontFamily: FONT.mono, fontSize: 12, marginTop: 2 }}>✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:andre@infinitydragon.ai" style={{
                display: "block", marginTop: 32,
                background: t.featured ? t.accent : "transparent",
                color: t.featured ? C.ink : C.text,
                border: t.featured ? "none" : `1px solid ${C.ruleStrong}`,
                padding: "14px 0", textAlign: "center",
                fontFamily: FONT.mono, fontSize: 11,
                letterSpacing: "0.14em", textTransform: "uppercase",
                textDecoration: "none", fontWeight: 600,
              }}>Initiate engagement</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TOKEN THREAT SURFACE ───────────────────────────────────────────────────
function TokenThreatSurface() {
  const [hover, setHover] = useState(0);
  return (
    <section id="tts" style={{ padding: "140px 28px", borderBottom: `1px solid ${C.rule}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel num="05" title="Token Threat Surface™" />

        <h2 style={{
          fontFamily: FONT.display,
          fontSize: "clamp(36px, 5vw, 64px)",
          lineHeight: 1, fontWeight: 400,
          letterSpacing: "-0.025em",
          margin: "48px 0 24px", maxWidth: 1000,
        }}>
          Risk begins at the <em style={{ fontStyle: "italic", color: C.gold }}>token level</em>.
          MITRE, NIST, and OWASP do not.
        </h2>

        <p style={{ color: C.textMute, fontSize: 17, lineHeight: 1.65, maxWidth: 720, margin: "0 0 80px" }}>
          The Token Threat Surface™ is the complete attack surface from raw input through
          inference, code generation, and execution — five zones where ungoverned token
          handling creates exploitable risk. GAIF-IASA governs all five.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 4, marginBottom: 60,
        }} className="tts-grid">
          {TTS_ZONES.map((z, i) => (
            <div key={z.z}
              onMouseEnter={() => setHover(i)}
              style={{
                padding: "28px 22px",
                border: `1px solid ${hover === i ? C.gold : C.ruleStrong}`,
                background: hover === i ? C.goldDim : C.inkSoft,
                cursor: "default", transition: "all 0.2s",
                minHeight: 200,
              }}>
              <div style={{
                fontFamily: FONT.mono, fontSize: 11,
                color: hover === i ? C.gold : C.textFaint,
                letterSpacing: "0.16em", marginBottom: 16,
              }}>{z.z}</div>
              <div style={{
                fontFamily: FONT.display, fontSize: 19,
                fontWeight: 500, marginBottom: 12,
                letterSpacing: "-0.01em", lineHeight: 1.2,
              }}>{z.name}</div>
              <div style={{
                fontSize: 13, color: C.textMute, lineHeight: 1.55,
              }}>{z.desc}</div>
            </div>
          ))}
        </div>

        {/* CIA mapping */}
        <div style={{
          padding: "40px 44px",
          background: C.inkSoft, border: `1px solid ${C.ruleStrong}`,
        }}>
          <div style={{
            fontFamily: FONT.mono, fontSize: 11,
            color: C.gold, letterSpacing: "0.16em",
            textTransform: "uppercase", marginBottom: 24,
          }}>CIA Triad · GAIF Mapping</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
          }}>
            {[
              ["Confidentiality", "E89 · Privacy & Confidentiality Layer"],
              ["Integrity",       "ACA · GIOS S17 (6 elements)"],
              ["Availability",    "HALT · S20 Workflow (17 elements)"],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{
                  fontFamily: FONT.display, fontSize: 26,
                  fontWeight: 500, marginBottom: 8,
                  letterSpacing: "-0.01em",
                }}>{k}</div>
                <div style={{
                  fontFamily: FONT.mono, fontSize: 12,
                  color: C.textMute, letterSpacing: "0.04em",
                }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .tts-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .tts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "100px 28px 60px", background: C.ink }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          fontFamily: FONT.display,
          fontSize: "clamp(40px, 6vw, 80px)",
          lineHeight: 0.95, fontWeight: 400,
          letterSpacing: "-0.03em",
          margin: "0 0 56px", maxWidth: 1100,
        }}>
          <em style={{ fontStyle: "italic", color: C.gold }}>From the Labs</em> of the
          AI Infinity Research & Development Institute.
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 48, paddingTop: 48, borderTop: `1px solid ${C.rule}`,
          marginBottom: 60,
        }}>
          <div>
            <div style={fLabel}>Founder & IP Owner</div>
            <div style={fValue}>Andre Thompson Sr.</div>
            <div style={fSub}>Champion of the AI Consumer™</div>
          </div>
          <div>
            <div style={fLabel}>Organization</div>
            <div style={fValue}>AI Infinity Group LLC</div>
            <div style={fSub}>Albany, Georgia</div>
          </div>
          <div>
            <div style={fLabel}>Contact</div>
            <a href="mailto:andre@infinitydragon.ai" style={{ ...fValue, textDecoration: "none", color: C.gold, display: "block" }}>
              andre@infinitydragon.ai
            </a>
            <div style={fSub}>infinitydragon.ai</div>
          </div>
          <div>
            <div style={fLabel}>Framework</div>
            <div style={fValue}>GAIF v∞</div>
            <div style={fSub}>143 elements · 20 sections · ∞✓</div>
          </div>
        </div>

        <div style={{
          paddingTop: 32, borderTop: `1px solid ${C.rule}`,
          display: "flex", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
          fontFamily: FONT.mono, fontSize: 10,
          color: C.textFaint, letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          <span>© {new Date().getFullYear()} AI Infinity Group LLC · All rights reserved</span>
          <span>Trade-secret protected · Plateau-Lock γ ≥ 0.995 · ∞✓</span>
        </div>
      </div>
    </footer>
  );
}

const fLabel = {
  fontFamily: FONT.mono, fontSize: 10,
  color: C.textFaint, letterSpacing: "0.14em",
  textTransform: "uppercase", marginBottom: 12,
};
const fValue = {
  fontFamily: FONT.display, fontSize: 17,
  color: C.text, marginBottom: 4,
  letterSpacing: "-0.005em",
};
const fSub = {
  fontFamily: FONT.body, fontSize: 13,
  color: C.textMute,
};
