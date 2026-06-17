import { verifyToken, parseCookies, COOKIE } from "../lib/cohortAuth.js";

/* ─────────────────────────────────────────────────────────────────────────
 *  Cohort 2 · "Governed AI for Entrepreneurs"
 *  EDIT this to publish materials. Titles & summaries are set; each item's
 *  `href` is a placeholder ("#") — replace with the real file URL (uploaded
 *  to /public, an external link, or a gated Supabase signed URL).
 *
 *  These are sent to the browser ONLY after the access code passes, so the
 *  gate genuinely protects them. Note: files placed in /public are readable
 *  by direct URL — for material that must stay gated, ask for the Supabase route.
 * ───────────────────────────────────────────────────────────────────────── */

const academy = {
  name: "Governed Intelligence Academy",
  cohort: "Cohort 2 · Governed AI for Entrepreneurs",
  partner: "Albany State University",
  intro: "Your training modules. Work through them in order — each checkpoint builds on the one before it.",
};

const modules = [
  {
    n: 1,
    title: "AI for Founders + Meet the Framework",
    summary: "Your starting point: what AI can and can't do for a founder, and a first pass through the nine-interrogative lens you'll use all cohort.",
    items: [
      { title: "Module slides", kind: "Slides", href: "#" },
      { title: "The nine interrogatives — reference", kind: "Reading", href: "#" },
      { title: "Module 1 worksheet", kind: "Worksheet", href: "#" },
    ],
  },
  {
    n: 2,
    title: "The AI Toolkit",
    summary: "A practical survey of the AI tools entrepreneurs actually use, and how to put each one under governance before you trust it.",
    items: [
      { title: "Module slides", kind: "Slides", href: "#" },
      { title: "Toolkit worksheet", kind: "Worksheet", href: "#" },
    ],
  },
  {
    n: 3,
    title: "Finding the Opportunity",
    summary: "Spot a real, governable business opportunity. Your first milestone: run the lens on an idea and defend it.",
    items: [
      { title: "Module slides", kind: "Slides", href: "#" },
      { title: "Opportunity worksheet", kind: "Worksheet", href: "#" },
      { title: "Milestone 1 submission", kind: "Live", href: "#" },
    ],
  },
  {
    n: 4,
    title: "Ethical AI + Failure Case Bank",
    summary: "Where AI goes wrong for businesses — a working bank of real failure cases and the ethical lines that prevent them.",
    items: [
      { title: "Module slides", kind: "Slides", href: "#" },
      { title: "Failure Case Bank", kind: "Reading", href: "#" },
      { title: "Module 4 worksheet", kind: "Worksheet", href: "#" },
    ],
  },
  {
    n: 5,
    title: "Standards & Compliance",
    summary: "The standards that matter — NIST AI RMF, ISO/IEC 42001, the EU AI Act — and how the framework maps to each.",
    items: [
      { title: "Module slides", kind: "Slides", href: "#" },
      { title: "Standards crosswalk", kind: "Reading", href: "#" },
      { title: "Module 5 worksheet", kind: "Worksheet", href: "#" },
    ],
  },
  {
    n: "5.5",
    title: "Vendor Evaluation",
    summary: "Judging an AI vendor before you sign — a governance scorecard for tools, models, and providers.",
    items: [
      { title: "Vendor scorecard", kind: "Worksheet", href: "#" },
      { title: "Walkthrough slides", kind: "Slides", href: "#" },
    ],
  },
  {
    n: 6,
    title: "Risk & the Threat Surface",
    summary: "Risk from the token up: the Token Threat Surface and how to size the danger in any AI you deploy.",
    items: [
      { title: "Module slides", kind: "Slides", href: "#" },
      { title: "Threat Surface worksheet", kind: "Worksheet", href: "#" },
    ],
  },
  {
    n: 7,
    title: "Judging AI Output",
    summary: "Tell good AI output from confident nonsense. Milestone: render real verdicts on live outputs.",
    items: [
      { title: "Module slides", kind: "Slides", href: "#" },
      { title: "Output-judging worksheet", kind: "Worksheet", href: "#" },
      { title: "Milestone 2 submission", kind: "Live", href: "#" },
    ],
  },
  {
    n: 8,
    title: "AI-Enabled Business Models",
    summary: "Designing a venture where governed AI is the engine, not a bolt-on — models, margins, and defensibility.",
    items: [
      { title: "Module slides", kind: "Slides", href: "#" },
      { title: "Business model canvas", kind: "Worksheet", href: "#" },
    ],
  },
  {
    n: 9,
    title: "Build & Review",
    summary: "Build your governed solution and put it through real review — the same discipline you'll carry into practice.",
    items: [
      { title: "Build brief", kind: "Reading", href: "#" },
      { title: "Review checklist", kind: "Worksheet", href: "#" },
    ],
  },
  {
    n: 10,
    title: "Showcase + Capstone",
    summary: "Present your capstone: a governed AI venture, end to end, defended in front of the cohort.",
    items: [
      { title: "Capstone brief", kind: "Reading", href: "#" },
      { title: "Showcase session", kind: "Live", href: "#" },
    ],
  },
  {
    n: 11,
    title: "Certification",
    summary: "The credential step — your Governance Review Packet goes to facilitator review, and the CLGIC credential issues on approval.",
    items: [
      { title: "Governance Review Packet", kind: "Reading", href: "#" },
      { title: "Final assessment", kind: "Quiz", href: "#" },
    ],
  },
];

export default function handler(req, res) {
  const cookies = parseCookies(req);
  if (!verifyToken(cookies[COOKIE])) {
    return res.status(401).json({ ok: false, error: "Not authorized" });
  }
  return res.status(200).json({ ok: true, academy, modules });
}
