# Student OS — landing page

Next.js app that sells Student OS: landing page with the animated banner, Stripe Checkout,
a receipt page that checks the payment on the server, and a 15-minute download link.

- `app/` — pages (`/`, `/thanks`, `/terms`, `/refunds`, `/privacy`) and API routes
- `app/api/checkout` — Buy button → Stripe Checkout Session → redirect
- `app/api/download` — streams `private/student-os.zip` for a valid, unexpired token only
- `scripts/build-zip.mjs` — builds the buyer zip from `../plugin` and the folder template on every build
- `components/banner` — the Stageshow banner (MIT, see `components/kit/LICENSE-STAGESHOW`)
- `demo/` — the test profile the banner content comes from
- `media/student-os-banner.mp4`, `public/banner-still.png` — recorded banner

## Go live

### 1. Repo
Make `ErfanK-9/Student-OS` **private** first. It holds the full plugin.

### 2. Stripe (test mode first)
1. Dashboard → Product catalogue → Add product: "Student OS", one-off, **A$19.00 AUD**. Copy the price ID (`price_…`).
2. Developers → API keys: copy the **secret** key (`sk_test_…`).

### 3. Vercel
1. Add New → Project → import `ErfanK-9/Student-OS`. **Root Directory: `site`**. Framework: Next.js (auto).
2. Settings → Environment Variables (Production and Preview):

   | Name | Value |
   |---|---|
   | `SITE_URL` | `https://yourdomain.com.au` (no trailing slash) |
   | `SITE_ABN` | your ABN |
   | `SITE_EMAIL` | the support email shown in the footer |
   | `STRIPE_SECRET_KEY` | `sk_test_…` now, `sk_live_…` at launch |
   | `STRIPE_PRICE_ID` | `price_…` (test now, live at launch: they differ) |
   | `DOWNLOAD_SECRET` | 40+ random characters (`openssl rand -base64 32`) |

   A production build fails on purpose if any of these are missing.
3. Upgrade the team to Pro (Hobby is non-commercial only).
4. Settings → Domains → add your domain and set the DNS records Vercel shows you.

### 4. Test (Stripe test mode)
- Buy with card `4242 4242 4242 4242`, any future expiry, any CVC → you land on `/thanks` → download works → the zip unzips and has `INSTALL.md`.
- Open `/thanks` with no `?session_id` → "No download here".
- Copy a download link, wait 16 minutes, open it → "This link has expired".
- Phone check, and iOS Settings → Accessibility → Motion → Reduce Motion: the banner shows the finished still.

### 5. Launch
Swap `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` for live values (make the product again in live mode), redeploy,
buy it once with your own card, then refund yourself in the Stripe dashboard.

## Local
```
npm install
npm run build && npm test   # full purchase flow against a fake Stripe
npm run dev
```
`STRIPE_API_BASE` exists only so the tests can point at a fake Stripe. Never set it in Vercel.
