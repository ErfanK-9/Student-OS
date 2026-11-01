import Stripe from "stripe";

let client: Stripe | null = null;

export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  // STRIPE_API_BASE is only for local tests against a fake Stripe server; leave it unset in Vercel.
  const base = process.env.STRIPE_API_BASE ? new URL(process.env.STRIPE_API_BASE) : null;
  client ??= base
    ? new Stripe(key, { host: base.hostname, port: Number(base.port), protocol: base.protocol.replace(":", "") as "http" | "https" })
    : new Stripe(key);
  return client;
}

// A paid session can mint fresh download links for this long after purchase,
// so a buyer who loses the tab can come back from their browser history.
export const REDEEM_WINDOW_S = 7 * 24 * 60 * 60;

export type Purchase = { ok: true; email: string | null } | { ok: false; reason: "missing" | "not-found" | "unpaid" | "too-old" };

export async function checkPurchase(sessionId: string | undefined, now = Date.now()): Promise<Purchase> {
  if (!sessionId || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return { ok: false, reason: "missing" };
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe().checkout.sessions.retrieve(sessionId);
  } catch {
    return { ok: false, reason: "not-found" };
  }
  if (session.payment_status !== "paid") return { ok: false, reason: "unpaid" };
  if (now / 1000 - session.created > REDEEM_WINDOW_S) return { ok: false, reason: "too-old" };
  return { ok: true, email: session.customer_details?.email ?? null };
}
