import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms · Student OS" };

export default function Terms() {
  return (
    <main className="doc">
      <h1>Terms of sale</h1>
      <p className="meta">Last updated 1 November 2026</p>

      <h2>Who you're buying from</h2>
      <p>
        Student OS is sold by {site.seller}
        {site.abn && <>, ABN {site.abn}</>}, a sole trader in New South Wales, Australia. Contact: {site.email || "see the footer"}.
      </p>

      <h2>What you get</h2>
      <p>
        A downloadable folder containing eight Claude skills, a folder template, a dashboard file and a data checker, as described on the <Link href="/">home page</Link>. It runs inside Claude, which you need
        separately. Claude is made by Anthropic; this product isn't affiliated with or endorsed by Anthropic.
      </p>

      <h2>Price and payment</h2>
      <p>
        The price is {site.price} (Australian dollars), paid once through Stripe. There's no subscription. The seller isn't registered for GST, so no GST is charged. Your bank may add a fee for overseas or
        currency conversion.
      </p>

      <h2>Delivery</h2>
      <p>
        After payment you're sent to a receipt page with a download link. Each link works for 15 minutes; reloading the receipt page makes a new one for 7 days after purchase. After that, email us with your
        receipt and we'll send it again.
      </p>

      <h2>Licence</h2>
      <ul>
        <li>Your purchase is a licence for one person to use Student OS, on as many of their own devices as they like.</li>
        <li>You can edit the skills and files for your own use.</li>
        <li>You can't resell, share, publish or redistribute Student OS or modified versions of it.</li>
        <li>Copyright stays with {site.seller}.</li>
      </ul>

      <h2>Your rights under Australian Consumer Law</h2>
      <p>
        Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. Nothing in these terms excludes, restricts or modifies those guarantees or any other right you have under the
        law. See the <Link href="/refunds">refund policy</Link> for what happens if something goes wrong.
      </p>

      <h2>How it behaves</h2>
      <p>
        The skills are instructions for Claude. Claude's output can be wrong, so check what it tells you, especially dates, grades and anything you send to an employer. The skills are written to read your
        calendar and apps, not change them, and never to send email or submit applications.
      </p>

      <h2>Limits</h2>
      <p>
        To the extent the law allows, and apart from the guarantees above, we're not liable for indirect loss, such as a missed deadline or a lost job opportunity, arising from your use of Student OS or of
        Claude.
      </p>

      <h2>Law</h2>
      <p>These terms are governed by the laws of New South Wales, Australia.</p>
    </main>
  );
}
