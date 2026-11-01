import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Refunds · Student OS" };

export default function Refunds() {
  return (
    <main className="doc">
      <h1>Refund policy</h1>
      <p className="meta">Last updated 1 November 2026</p>

      <p>
        Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. Student OS must work as described, be of acceptable quality and do what we said it would. If it doesn't, you're
        entitled to a remedy.
      </p>

      <h2>If there's a major problem</h2>
      <p>
        For example, the download is broken and we can't fix it, or the product is substantially different from what this site describes. You can choose a full refund. Your right to a remedy doesn't depend
        on a time limit we set.
      </p>

      <h2>If there's a minor problem</h2>
      <p>We'll fix it within a reasonable time, for example by sending a corrected version. If we can't or don't, you can ask for a refund.</p>

      <h2>Change of mind</h2>
      <p>
        Because Student OS is a digital download you keep as soon as you pay, we don't offer refunds for change of mind. This doesn't affect your rights above.
      </p>

      <h2>How to ask</h2>
      <p>
        Email {site.email || "us"} with your Stripe receipt and a line on what went wrong. We aim to reply within 3 business days. Refunds go back to the card you paid with through Stripe.
      </p>
    </main>
  );
}
