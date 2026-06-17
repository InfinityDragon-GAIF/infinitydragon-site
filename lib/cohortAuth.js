import crypto from "crypto";

// Cohort 2 access control — runs only inside Vercel serverless functions.
// Driven by two env vars (set in Vercel → Settings → Environment Variables):
//   COHORT2_ACCESS_CODE   the code(s) you give students. Comma-separate for several.
//   COHORT2_SECRET        a long random string used to sign the session cookie.
// No npm dependencies — uses Node's built-in crypto only.

const SECRET = process.env.COHORT2_SECRET || "";
export const COOKIE = "cohort2_auth";

export function issueToken(subject = "cohort2") {
  const body = Buffer.from(JSON.stringify({ s: subject, iat: Date.now() })).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyToken(token) {
  if (!token || !SECRET) return false;
  const [body, sig] = String(token).split(".");
  if (!body || !sig) return false;
  const expected = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function checkCode(input) {
  const codes = (process.env.COHORT2_ACCESS_CODE || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  let ok = false;
  for (const c of codes) {
    if (c.length === input.length) {
      try {
        if (crypto.timingSafeEqual(Buffer.from(c), Buffer.from(input))) ok = true;
      } catch {
        /* ignore */
      }
    }
  }
  return ok;
}

export function parseCookies(req) {
  const header = req.headers.cookie || "";
  const out = {};
  for (const part of header.split(";")) {
    const p = part.trim();
    if (!p) continue;
    const i = p.indexOf("=");
    if (i < 0) continue;
    out[p.slice(0, i)] = decodeURIComponent(p.slice(i + 1));
  }
  return out;
}

export function cookieString(value, maxAge) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE}=${value}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}
