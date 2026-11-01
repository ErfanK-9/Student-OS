import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy · Student OS" };

export default function Privacy() {
  return (
    <main className="doc">
      <h1>Privacy</h1>
      <p className="meta">Last updated 1 November 2026</p>

      <p>This site collects as little as it can. There's no account, no analytics, no advertising and no tracking cookies.</p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <b>When you buy:</b> Stripe collects your name, email, country and card details. We receive your name, email, country and the payment record. We never see your card number.
        </li>
        <li>
          <b>When you visit:</b> our host, Vercel, keeps short-lived server logs (IP address, browser type, pages requested) for security and to keep the site running.
        </li>
        <li>
          <b>When you email us:</b> your message and address.
        </li>
      </ul>

      <h2>What we use it for</h2>
      <p>Delivering your download, receipts, support, refunds, and the tax records the law requires us to keep (generally 5 years). We don't sell it, and we don't send marketing email.</p>

      <h2>Who else handles it</h2>
      <p>
        Stripe (payments) and Vercel (hosting). Both may store data outside Australia, including in the United States, under their own privacy policies. Nothing is shared with anyone else unless the law
        requires it.
      </p>

      <h2>Your Student OS folder</h2>
      <p>The data you put into Student OS stays in your own folder and your Claude account. It never comes to us.</p>

      <h2>Access, correction and complaints</h2>
      <p>
        Email {site.email || "us"} to see, correct or delete what we hold about you, apart from records we must keep by law. If you're unhappy with how we handle it, you can complain to the Office of the
        Australian Information Commissioner (oaic.gov.au).
      </p>
    </main>
  );
}
