// Fails a Vercel *production* build if anything the shop needs is missing.
// Preview and local builds only warn, so you can deploy before Stripe is set up.
const need = ["SITE_URL", "SITE_ABN", "SITE_EMAIL", "STRIPE_SECRET_KEY", "STRIPE_PRICE_ID", "DOWNLOAD_SECRET"];
const missing = need.filter((k) => !process.env[k]);
if ((process.env.DOWNLOAD_SECRET ?? "").length && process.env.DOWNLOAD_SECRET.length < 32) missing.push("DOWNLOAD_SECRET (32+ chars)");
if (missing.length) {
  const msg = `check-env: missing ${missing.join(", ")}`;
  if (process.env.VERCEL_ENV === "production") { console.error(msg); process.exit(1); }
  console.warn(msg + " (warning only outside Vercel production)");
}
