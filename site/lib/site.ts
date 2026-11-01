// Business details shown on every page. Set these in Vercel → Settings → Environment Variables.
export const site = {
  product: "Student OS",
  price: "A$19",
  url: process.env.SITE_URL ?? "http://localhost:3000",
  seller: process.env.SITE_SELLER ?? "Erfan Kordabadi",
  abn: process.env.SITE_ABN ?? "",
  email: process.env.SITE_EMAIL ?? "",
};

/** Missing business details, so pages and checks can flag them instead of shipping blanks. */
export function missingDetails(): string[] {
  const m: string[] = [];
  if (!site.abn) m.push("SITE_ABN");
  if (!site.email) m.push("SITE_EMAIL");
  if (!process.env.SITE_URL) m.push("SITE_URL");
  return m;
}
