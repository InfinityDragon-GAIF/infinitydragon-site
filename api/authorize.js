
import { checkCode, issueToken, cookieString } from "../lib/cohortAuth.js";

export default function handler(req, res) {
  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", cookieString("", 0));
    return res.status(200).json({ ok: true });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const code = body && body.code ? String(body.code).trim() : "";
  if (!code || !checkCode(code)) {
    return res
      .status(401)
      .json({ ok: false, error: "That access code wasn't recognized. Check your enrollment email." });
  }

  res.setHeader("Set-Cookie", cookieString(issueToken(), 60 * 60 * 24 * 30));
  return res.status(200).json({ ok: true });
}
