import { createHmac, timingSafeEqual } from "node:crypto";

// A download token is "{session}.{expiry}.{signature}". The signature is an HMAC over
// session + expiry with DOWNLOAD_SECRET, so a token can't be forged or extended.
export const LINK_TTL_MS = 15 * 60 * 1000;

function secret(): string {
  const s = process.env.DOWNLOAD_SECRET;
  if (!s || s.length < 32) throw new Error("DOWNLOAD_SECRET must be set (32+ characters)");
  return s;
}

const sign = (payload: string, key: string) => createHmac("sha256", key).update(payload).digest("base64url");

export function makeToken(sessionId: string, now = Date.now(), key = secret()): string {
  const exp = now + LINK_TTL_MS;
  const payload = `${sessionId}.${exp}`;
  return `${payload}.${sign(payload, key)}`;
}

export type TokenCheck = { ok: true; sessionId: string } | { ok: false; reason: "malformed" | "bad-signature" | "expired" };

export function checkToken(token: string | null | undefined, now = Date.now(), key = secret()): TokenCheck {
  if (!token) return { ok: false, reason: "malformed" };
  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, reason: "malformed" };
  const [sessionId, expRaw, sig] = parts;
  const exp = Number(expRaw);
  if (!sessionId || !Number.isFinite(exp)) return { ok: false, reason: "malformed" };
  const want = Buffer.from(sign(`${sessionId}.${expRaw}`, key));
  const got = Buffer.from(sig);
  if (want.length !== got.length || !timingSafeEqual(want, got)) return { ok: false, reason: "bad-signature" };
  if (now > exp) return { ok: false, reason: "expired" };
  return { ok: true, sessionId };
}
