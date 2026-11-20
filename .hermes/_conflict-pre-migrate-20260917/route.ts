import { NextRequest, NextResponse } from "next/server";
import { guardApiRequest, getGuardedBody } from "@/lib/api-security";

export const runtime = "edge";

/**
 * 取消訂閱通知 API (2026-09-16)
 * 由 /unsubscribe 頁面自動提交 → 透過 Resend 向 zprintpro@outlook.com 發送退訂通知，
 * 供運營將該地址加入推廣郵件黑名單 (suppression list)。
 * 未配置 RESEND_API_KEY 時優雅跳過（返回 ok，不影響用戶體驗）。
 */
export async function POST(req: NextRequest) {
  const block = await guardApiRequest(req);
  if (block) return block;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: true, skipped: "RESEND_API_KEY not configured" });
  }

  const body = getGuardedBody<Record<string, string>>(req) || {};
  const email = String(body.email || "").trim().slice(0, 200);
  const ref = String(body.ref || "").trim().slice(0, 80);
  if (!email && !ref) {
    return NextResponse.json({ ok: true, note: "empty request" });
  }

  const html = "<div style=\"font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#333\">" +
    "<div style=\"background:#2873F5;padding:20px 24px;border-radius:12px 12px 0 0;color:#fff\">" +
    "<h2 style=\"margin:0;font-size:18px\">退訂請求 / Unsubscribe Request</h2></div>" +
    "<div style=\"background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px\">" +
    "<table style=\"width:100%;border-collapse:collapse;font-size:14px\">" +
    "<tr><td style=\"padding:8px 0;color:#6b7280;width:110px\"><b>Email</b></td><td style=\"padding:8px 0\">" + (email || "(未提供)") + "</td></tr>" +
    "<tr><td style=\"padding:8px 0;color:#6b7280\"><b>Ref</b></td><td style=\"padding:8px 0;font-family:monospace\">" + (ref || "(無)") + "</td></tr>" +
    "<tr><td style=\"padding:8px 0;color:#6b7280\"><b>Time</b></td><td style=\"padding:8px 0\">" + new Date().toISOString() + "</td></tr>" +
    "</table>" +
    "<p style=\"color:#6b7280;font-size:12px;margin-top:16px\">請將該地址加入推廣郵件黑名單（suppression list），系統將不再向其發送營銷郵件。</p>" +
    "</div></div>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "ZprintPro Website <quotes@zprintpro.com>",
        to: ["zprintpro@outlook.com"],
        subject: "[ZprintPro 退訂] " + (email || ref),
        html,
      }),
    });
    return NextResponse.json({ ok: true, sent: res.ok });
  } catch (_e) {
    return NextResponse.json({ ok: true, note: "notify failed" });
  }
}
