import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { site } from "@/lib/site";

// The Buy button posts here. No JavaScript needed on the page.
export async function POST() {
  const price = process.env.STRIPE_PRICE_ID;
  if (!price) return new NextResponse("Checkout isn't configured yet.", { status: 503 });
  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price, quantity: 1 }],
      success_url: `${site.url}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site.url}/`,
      custom_text: { submit: { message: `By paying you agree to the terms at ${site.url}/terms.` } },
    });
    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("checkout: session create failed", err);
    return new NextResponse("Checkout is unavailable right now. Try again in a minute.", { status: 502 });
  }
}
