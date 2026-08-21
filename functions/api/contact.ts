// Cloudflare Pages Function — POST /api/contact
// Sends form data to sediu.blankspace@gmail.com via Resend.
// Environment variables required (set in Cloudflare Pages → Settings → Environment variables):
//   RESEND_API_KEY     — from resend.com (free tier covers 3 000 emails/month)
//   CONTACT_TO_EMAIL   — sediu.blankspace@gmail.com
//   CONTACT_FROM_EMAIL — e.g. contact@blankspace.ro (must be a verified Resend domain)

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
}

// Simple email regex — server-side guard
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n<>]/g, " ").trim().slice(0, 2000);
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // CORS — only needed if calling from a different origin; same-origin is fine
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  let body: FormData;
  try {
    body = await request.formData();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_request" }), {
      status: 400,
      headers,
    });
  }

  // ── Honeypot anti-spam ──
  const pot = sanitize(body.get("website"));
  if (pot) {
    // Pretend success to bots
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  }

  // ── Collect fields ──
  const name     = sanitize(body.get("name"));
  const email    = sanitize(body.get("email"));
  const phone    = sanitize(body.get("phone"));
  const interest = sanitize(body.get("interest"));
  const message  = sanitize(body.get("message"));

  // ── Server-side validation ──
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ ok: false, error: "required_fields_missing" }),
      { status: 422, headers }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return new Response(
      JSON.stringify({ ok: false, error: "invalid_email" }),
      { status: 422, headers }
    );
  }

  const toEmail   = env.CONTACT_TO_EMAIL   || "sediu.blankspace@gmail.com";
  const fromEmail = env.CONTACT_FROM_EMAIL || "contact@blankspace.ro";
  const apiKey    = env.RESEND_API_KEY     || "";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY not set");
    return new Response(
      JSON.stringify({ ok: false, error: "service_unavailable" }),
      { status: 503, headers }
    );
  }

  const now = new Date().toLocaleString("ro-RO", {
    timeZone: "Europe/Bucharest",
    dateStyle: "long",
    timeStyle: "short",
  });

  const subject = `BlankSpace — solicitare nouă: ${interest || "General"}`;

  const htmlBody = `
<table style="font-family:Arial,sans-serif;font-size:15px;color:#111;border-collapse:collapse;width:100%;max-width:600px">
  <tr><td colspan="2" style="background:#111111;padding:20px 24px">
    <img src="https://blankspace-v2.pages.dev/images/brand/blankspace-email-logo.png" alt="BlankSpace" width="180" style="display:block;width:180px;max-width:180px;height:auto;border:0;outline:none;text-decoration:none"/>
  </td></tr>
  <tr><td colspan="2" style="padding:20px 24px 4px;font-size:18px;font-weight:bold;color:#111">
    Solicitare nouă prin website
  </td></tr>
  <tr><td colspan="2" style="padding:0 24px 20px;font-size:13px;color:#888">${now}</td></tr>
  <tr style="background:#f8f7f4">
    <td style="padding:10px 24px;font-weight:bold;width:140px;vertical-align:top">Nume</td>
    <td style="padding:10px 24px">${name}</td>
  </tr>
  <tr>
    <td style="padding:10px 24px;font-weight:bold;vertical-align:top">Email</td>
    <td style="padding:10px 24px"><a href="mailto:${email}" style="color:#B8A22A">${email}</a></td>
  </tr>
  <tr style="background:#f8f7f4">
    <td style="padding:10px 24px;font-weight:bold;vertical-align:top">Telefon</td>
    <td style="padding:10px 24px">${phone || "—"}</td>
  </tr>
  <tr>
    <td style="padding:10px 24px;font-weight:bold;vertical-align:top">Interes</td>
    <td style="padding:10px 24px">${interest || "—"}</td>
  </tr>
  <tr style="background:#f8f7f4">
    <td style="padding:10px 24px;font-weight:bold;vertical-align:top">Mesaj</td>
    <td style="padding:10px 24px;white-space:pre-wrap">${message}</td>
  </tr>
</table>`;

  const textBody =
    `Solicitare nouă BlankSpace — ${now}\n\n` +
    `Nume:    ${name}\n` +
    `Email:   ${email}\n` +
    `Telefon: ${phone || "—"}\n` +
    `Interes: ${interest || "—"}\n\n` +
    `Mesaj:\n${message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `BlankSpace Contact <${fromEmail}>`,
        to:   [toEmail],
        reply_to: email,
        subject,
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] Resend error:", res.status, err);
      return new Response(
        JSON.stringify({ ok: false, error: "send_failed" }),
        { status: 502, headers }
      );
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err) {
    console.error("[contact] fetch error:", err);
    return new Response(
      JSON.stringify({ ok: false, error: "network_error" }),
      { status: 502, headers }
    );
  }
};

// Handle OPTIONS preflight
export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
