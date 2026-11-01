// End-to-end purchase flow against a fake Stripe API. Run after `npm run build`:
//   npm test
// Covers: checkout redirect, /thanks with no / bad / unpaid / old / paid sessions,
// download with no / forged / expired / valid tokens, and the 15-minute expiry.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { createHmac } from "node:crypto";

const SECRET = "test-secret-that-is-at-least-32-characters-long";
const SITE = "http://127.0.0.1:3100";
const now = () => Math.floor(Date.now() / 1000);
const SESSIONS = {
  cs_test_paid: { payment_status: "paid", created: now() - 60, customer_details: { email: "buyer@example.com" } },
  cs_test_unpaid: { payment_status: "unpaid", created: now() - 60 },
  cs_test_old: { payment_status: "paid", created: now() - 8 * 86400 },
};

let fake, next;
const sign = (p) => createHmac("sha256", SECRET).update(p).digest("base64url");

before(async () => {
  fake = createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (req.method === "POST" && req.url === "/v1/checkout/sessions") {
      return res.end(JSON.stringify({ id: "cs_test_new", object: "checkout.session", url: "https://checkout.stripe.test/pay/cs_test_new" }));
    }
    const m = req.url.match(/^\/v1\/checkout\/sessions\/([^/?]+)/);
    const s = m && SESSIONS[m[1]];
    if (s) return res.end(JSON.stringify({ id: m[1], object: "checkout.session", ...s }));
    res.statusCode = 404;
    res.end(JSON.stringify({ error: { type: "invalid_request_error", message: "No such checkout.session" } }));
  }).listen(12111);

  next = spawn("npx", ["next", "start", "-p", "3100"], {
    cwd: new URL("..", import.meta.url).pathname,
    env: { ...process.env, STRIPE_SECRET_KEY: "sk_test_fake", STRIPE_PRICE_ID: "price_test", STRIPE_API_BASE: "http://127.0.0.1:12111", DOWNLOAD_SECRET: SECRET, SITE_URL: SITE },
    stdio: "ignore",
  });
  for (let i = 0; i < 100; i++) {
    try { await fetch(SITE + "/terms"); return; } catch { await new Promise((r) => setTimeout(r, 200)); }
  }
  throw new Error("next start didn't come up");
});

after(() => { next?.kill(); fake?.close(); });

const html = (path) => fetch(SITE + path).then((r) => r.text());
const linkIn = (page) => page.match(/href="(\/api\/download\?t=[^"]+)"/)?.[1]?.replaceAll("&amp;", "&");

test("Buy button redirects to Stripe Checkout", async () => {
  const r = await fetch(SITE + "/api/checkout", { method: "POST", redirect: "manual" });
  assert.equal(r.status, 303);
  assert.equal(r.headers.get("location"), "https://checkout.stripe.test/pay/cs_test_new");
});

for (const [name, path] of [
  ["no session", "/thanks"],
  ["junk session", "/thanks?session_id=hello"],
  ["unknown session", "/thanks?session_id=cs_test_nope"],
  ["unpaid session", "/thanks?session_id=cs_test_unpaid"],
  ["session older than 7 days", "/thanks?session_id=cs_test_old"],
]) {
  test(`/thanks with ${name} gives no download link`, async () => {
    const page = await html(path);
    assert.equal(linkIn(page), undefined);
    assert.match(page, /No download here/);
  });
}

test("/thanks with a paid session gives a link that expires in 15 minutes", async () => {
  const page = await html("/thanks?session_id=cs_test_paid");
  const link = linkIn(page);
  assert.ok(link, "expected a download link");
  const [sid, exp] = decodeURIComponent(link.split("t=")[1]).split(".");
  assert.equal(sid, "cs_test_paid");
  const minutes = (Number(exp) - Date.now()) / 60000;
  assert.ok(minutes > 14.5 && minutes <= 15, `expiry ${minutes.toFixed(2)} min`);
  const r = await fetch(SITE + link);
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("content-type"), "application/zip");
  const bytes = new Uint8Array(await r.arrayBuffer());
  assert.deepEqual([...bytes.slice(0, 2)], [0x50, 0x4b], "zip magic bytes");
});

test("download refuses missing, forged and expired tokens", async () => {
  assert.equal((await fetch(SITE + "/api/download")).status, 403);
  const exp = Date.now() + 600000;
  assert.equal((await fetch(`${SITE}/api/download?t=cs_test_paid.${exp}.forged`)).status, 403);
  const longer = Date.now() + 86400000; // valid signature for one expiry, swapped onto another
  assert.equal((await fetch(`${SITE}/api/download?t=cs_test_paid.${longer}.${sign(`cs_test_paid.${exp}`)}`)).status, 403);
  const past = Date.now() - 1000;
  assert.equal((await fetch(`${SITE}/api/download?t=cs_test_paid.${past}.${sign(`cs_test_paid.${past}`)}`)).status, 410);
});

test("the zip isn't reachable as a public file", async () => {
  for (const p of ["/student-os.zip", "/private/student-os.zip", "/_next/static/student-os.zip"]) {
    assert.equal((await fetch(SITE + p)).status, 404, p);
  }
});
