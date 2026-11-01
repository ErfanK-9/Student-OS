import type { NextConfig } from "next";

const config: NextConfig = {
  // Ship the buyer zip inside the download function only
  outputFileTracingIncludes: { "/api/download": ["./private/**"] },
  // The site imports the plugin's sibling folders at build time (scripts/build-zip.mjs)
  outputFileTracingRoot: new URL("..", import.meta.url).pathname,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      // The receipt URL carries the Stripe session id; don't leak it to other sites
      { source: "/thanks", headers: [{ key: "Referrer-Policy", value: "no-referrer" }, { key: "X-Robots-Tag", value: "noindex" }] },
    ];
  },
};

export default config;
