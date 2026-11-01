import Banner from "@/components/Banner";
import { site } from "@/lib/site";

const SKILLS = [
  ["/setup", "First run. A short interview that fills in your schedule, subjects, habits and goals."],
  ["/today", "Morning brief from your calendar, tasks and habits, plus a refreshed dashboard."],
  ["/week", "Weekly review of habits, earnings and uni, then next week planned around your fixed blocks."],
  ["/prep", "Context pack before a class, meeting, call or shift."],
  ["/study", "Timed active-recall drills from your own notes, one question at a time."],
  ["/apply", "Resume bullets and a cover letter tailored to one job ad, using only your real evidence."],
  ["/research", "Fixed frameworks for a company, a course, a tool or a topic."],
  ["/coach", "Builds a coach skill for anything you're trying to get better at."],
] as const;

const FAQ = [
  [
    "What do I need?",
    "Claude, with access to a folder on your computer: the Claude desktop app or Claude Code. Skills work on every Claude plan, Free included, but daily use will go further on a paid plan. A connected calendar makes /today and /week much better.",
  ],
  ["Is it a subscription?", "No. You pay once and keep what you download."],
  [
    "Does it send emails or submit applications for me?",
    "No. Every skill only reads your calendar and connected apps. /apply drafts; you decide what gets sent.",
  ],
  [
    "Where does my data go?",
    "Into your own folder. Your schedule, grades and pay stay on your computer and in your Claude account. We never see them.",
  ],
  [
    "I lost my download link.",
    "Open the receipt page again from your browser history within 7 days of buying and it makes a fresh link. After that, email us with your Stripe receipt.",
  ],
  ["Can I get a refund?", "If it doesn't work as described, yes. The refund policy has the details, including your rights under Australian Consumer Law."],
  ["Is GST included?", "There's no GST. The seller isn't registered for GST, so the price is the full amount."],
] as const;

function BuyButton({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <form action="/api/checkout" method="post">
      <button className={`buy buy--${size}`} type="submit">
        Buy Student OS · {site.price}
      </button>
    </form>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero">
        <h1>Uni, shifts and job applications, run by Claude.</h1>
        <p>Student OS is eight Claude skills and a folder template for students who work. A brief by 6am, study drills that stick, and applications tailored to every ad.</p>
        <BuyButton />
        <small>{site.price} once · instant download · no sign-up</small>
      </section>

      <div className="banner">
        <Banner />
      </div>

      <section className="block" id="how">
        <h2>How it works</h2>
        <p className="lede">Fifteen minutes of setup, then it runs on what's already in your calendar.</p>
        <ol className="steps">
          <li>
            <b>Download the folder</b>
            <span>Pay, then download straight away. Unzip it wherever you keep uni stuff.</span>
          </li>
          <li>
            <b>
              Run <code>/setup</code>
            </b>
            <span>Claude asks about your subjects, shifts, habits and target roles in short rounds and writes them down.</span>
          </li>
          <li>
            <b>
              <code>/today</code> every morning
            </b>
            <span>Plus <code>/week</code> on your planning day. Everything else is there when you need it.</span>
          </li>
        </ol>
      </section>

      <section className="block" id="included">
        <h2>What's included</h2>
        <p className="lede">Eight skills, plus the folder they read and write.</p>
        <ul className="skills">
          {SKILLS.map(([cmd, what]) => (
            <li key={cmd}>
              <code>{cmd}</code>
              <span>{what}</span>
            </li>
          ))}
        </ul>
        <p className="extra">Also: the folder template (uni, health, income and side-hustle domains), a dashboard you open in a browser, and a checker that keeps your data files valid.</p>
      </section>

      <section className="block" id="price">
        <div className="price">
          <div>
            <h2>One payment. Yours to keep.</h2>
            <div className="amount">
              {site.price} <small>AUD</small>
            </div>
            <ul>
              <li>All eight skills and the folder template</li>
              <li>Download straight after payment</li>
              <li>Secure checkout by Stripe</li>
            </ul>
          </div>
          <BuyButton />
        </div>
      </section>

      <section className="block" id="faq">
        <h2>Questions</h2>
        <div className="faq">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
