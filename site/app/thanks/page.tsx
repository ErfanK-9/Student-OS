import type { Metadata } from "next";
import Link from "next/link";
import { checkPurchase } from "@/lib/stripe";
import { makeToken } from "@/lib/token";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Your download · Student OS", robots: { index: false } };

const FAIL: Record<string, string> = {
  missing: "There's no purchase attached to this page.",
  "not-found": "We couldn't find that purchase.",
  unpaid: "This payment hasn't gone through yet. Refresh in a minute.",
  "too-old": "This receipt link is more than 7 days old, so it can't make new download links.",
};

export default async function Thanks({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const purchase = await checkPurchase(session_id);

  if (!purchase.ok) {
    return (
      <main className="doc">
        <h1>No download here</h1>
        <div className="card">
          <p>{FAIL[purchase.reason]}</p>
          <p>
            {purchase.reason === "missing" ? <Link href="/">Back to Student OS</Link> : <>Bought it and still stuck? Email {site.email || "us"} with your Stripe receipt.</>}
          </p>
        </div>
      </main>
    );
  }

  const href = `/api/download?t=${encodeURIComponent(makeToken(session_id!))}`;
  return (
    <main className="doc">
      <h1>You're in.</h1>
      <p className="meta">{purchase.email ? `Receipt sent to ${purchase.email}.` : "Stripe has emailed your receipt."}</p>
      <div className="card">
        <p>
          <a className="buy buy--lg" href={href} download>
            Download Student OS
          </a>
        </p>
        <p>This link works for 15 minutes. Reload this page for a new one, any time in the next 7 days.</p>
      </div>
      <h2>Next</h2>
      <ol>
        <li>Unzip the folder somewhere you'll keep it.</li>
        <li>
          Follow <code>INSTALL.md</code> inside to add the skills.
        </li>
        <li>
          Open the folder in Claude and run <code>/setup</code>.
        </li>
      </ol>
    </main>
  );
}
