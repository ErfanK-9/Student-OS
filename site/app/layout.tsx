import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { site, missingDetails } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Student OS: Claude skills for students who work",
  description: "Eight Claude skills and a folder template that run a working student's week: a 6am brief, timed study drills and tailored applications. A$19, one payment.",
  openGraph: { title: "Student OS", description: "Your day, briefed by 6am. Claude skills for students who work.", images: ["/banner-still.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const missing = missingDetails();
  return (
    <html lang="en-AU">
      <body>
        <div className="wrap">
          <header className="top">
            <Link href="/" className="mark">
              <i aria-hidden>/</i>Student OS
            </Link>
            <form action="/api/checkout" method="post">
              <button className="buy buy--sm" type="submit">
                Buy · {site.price}
              </button>
            </form>
          </header>
          {children}
          <footer className="foot">
            <nav aria-label="Legal">
              <Link href="/terms">Terms</Link>
              <Link href="/refunds">Refunds</Link>
              <Link href="/privacy">Privacy</Link>
              {site.email && <a href={`mailto:${site.email}`}>Contact</a>}
            </nav>
            <p>
              © {new Date().getFullYear()} {site.seller}
              {site.abn && <> · ABN {site.abn}</>}
              {site.email && <> · {site.email}</>}
            </p>
            <p>Not affiliated with or endorsed by Anthropic. Claude is a trademark of Anthropic.</p>
            {missing.length > 0 && process.env.NODE_ENV !== "production" && <p className="warn">Set before launch: {missing.join(", ")}</p>}
          </footer>
        </div>
      </body>
    </html>
  );
}
