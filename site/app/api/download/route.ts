import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { checkToken } from "@/lib/token";

export const dynamic = "force-dynamic";

// The zip lives in private/, which is bundled into this function only and never
// served as a static file. The only way to it is a valid, unexpired token.
export async function GET(req: Request) {
  const t = new URL(req.url).searchParams.get("t");
  const check = checkToken(t);
  if (!check.ok) {
    const msg = check.reason === "expired" ? "This link has expired. Reload your receipt page for a fresh one." : "Invalid download link.";
    return new Response(msg, { status: check.reason === "expired" ? 410 : 403, headers: { "Cache-Control": "no-store" } });
  }
  const zip = await readFile(join(process.cwd(), "private", "student-os.zip"));
  return new Response(new Uint8Array(zip), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="student-os.zip"',
      "Content-Length": String(zip.length),
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
