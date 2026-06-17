import { verifyToken, parseCookies, COOKIE } from "../lib/cohortAuth.js";

/* ─────────────────────────────────────────────────────────────────────────
 *  EDIT THIS to publish Cohort 2 materials.
 *  These are sent to the browser ONLY after the access code passes — they are
 *  not in the public page, so the gate genuinely protects them.
 *
 *  href hosting note: files dropped in /public are world-readable by direct
 *  URL. For material that must stay gated, store it in a private Supabase
 *  bucket and return a signed URL from a gated function. Say the word and I'll
 *  add that route.
 * ───────────────────────────────────────────────────────────────────────── */

const academy = {
  name: "Governed Intelligence Academy",
  cohort: "Cohort 2",
  partner: "Albany State University",
  intro: "Your training modules. Work through them in order — each checkpoint builds on the one before it.",
};

const modules = [
  {
    n: 1,
    title: "Foundations: The Nine Interrogatives",
    summary: "Where governance begins — the human-originated questions that route every claim before AI touches it.",
    items: [
      { title: "Welcome & how this cohort works", kind: "Reading", href: "#" },
      { title: "The nine interrogatives, explained", kind: "Slides", href: "#" },
      { title: "Module 1 worksheet", kind: "Worksheet", href: "#" },
    ],
  },
  {
    n: 2,
    title: "The Governance Pipeline",
    summary: "From AI(x) to Governed Intelligence — how layers compose, and what E=L means in practice.",
    items: [
      { title: "Walking the pipeline end to end", kind: "Video", href: "#" },
      { title: "Composition vs. addition", kind: "Slides", href: "#" },
      { title: "Module 2 worksheet", kind: "Worksheet", href: "#" },
    ],
  },
  {
    n: 3,
    title: "Evidence, Audit & Human Authority",
    summary: "Why no AI may certify itself — the evidence ledger, the audit trail, and keeping a human in the loop.",
    items: [
      { title: "The evidence ledger", kind: "Reading", href: "#" },
      { title: "Live session: running an audit", kind: "Live", href: "#" },
      { title: "Cohort 2 checkpoint quiz", kind: "Quiz", href: "#" },
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
