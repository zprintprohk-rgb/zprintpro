export interface Env {
  RESEND_API_KEY: string;
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const formData = await context.request.formData();
    const name = (formData.get('name') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const email = (formData.get('email') as string) || '';
    const category = (formData.get('category') as string) || '';
    const quantity = (formData.get('quantity') as string) || '';
    const size = (formData.get('size') as string) || '';
    const message = (formData.get('message') as string) || '';
    const locale = (formData.get('locale') as string) || 'zh-hk';

    const files = formData.getAll('attachments') as File[];
    const validFiles = files.filter((f) => f && f.size > 0);

    const labelMap: Record<string, Record<string, string>> = {
      'zh-hk': {
        title: '新的印刷詢價', name: '姓名', phone: '聯絡電話', email: '電郵',
        category: '產品類型', quantity: '印刷數量', size: '尺寸規格',
        message: '留言內容', none: '無',
      },
      en: {
        title: 'New Printing Quote Request', name: 'Name', phone: 'Phone', email: 'Email',
        category: 'Product Category', quantity: 'Quantity', size: 'Size',
        message: 'Message', none: 'None',
      },
      ja: {
        title: '新規印刷お見積もり依頼', name: 'お名前', phone: '電話番号', email: 'メール',
        category: '製品カテゴリー', quantity: '数量', size: 'サイズ',
        message: 'メッセージ', none: 'なし',
      },
    };
    const t = labelMap[locale] || labelMap['zh-hk'];
    const submittedTime = new Date().toLocaleString(
      locale === 'zh-hk' ? 'zh-HK' : locale === 'ja' ? 'ja-JP' : 'en-US'
    );

    const htmlContent = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
      <div style="background:linear-gradient(135deg,#2873F5,#1E5FD1);padding:24px;border-radius:12px 12px 0 0;color:white">
        <h2 style="margin:0;font-size:20px">${t.title}</h2>
        <p style="margin:8px 0 0;opacity:0.9;font-size:14px">${submittedTime}</p>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          <tr style="border-bottom:1px solid #f3f4f6"><td style="padding:12px 0;width:120px;color:#6b7280;vertical-align:top"><strong>${t.name}</strong></td><td style="padding:12px 0">${name || t.none}</td></tr>
          <tr style="border-bottom:1px solid #f3f4f6"><td style="padding:12px 0;color:#6b7280;vertical-align:top"><strong>${t.phone}</strong></td><td style="padding:12px 0;color:#2873F5;font-weight:bold">${phone}</td></tr>
          <tr style="border-bottom:1px solid #f3f4f6"><td style="padding:12px 0;color:#6b7280;vertical-align:top"><strong>${t.email}</strong></td><td style="padding:12px 0"><a href="mailto:${email}" style="color:#2873F5">${email}</a></td></tr>
          <tr style="border-bottom:1px solid #f3f4f6"><td style="padding:12px 0;color:#6b7280;vertical-align:top"><strong>${t.category}</strong></td><td style="padding:12px 0">${category || t.none}</td></tr>
          <tr style="border-bottom:1px solid #f3f4f6"><td style="padding:12px 0;color:#6b7280;vertical-align:top"><strong>${t.quantity}</strong></td><td style="padding:12px 0">${quantity || t.none}</td></tr>
          <tr style="border-bottom:1px solid #f3f4f6"><td style="padding:12px 0;color:#6b7280;vertical-align:top"><strong>${t.size}</strong></td><td style="padding:12px 0">${size || t.none}</td></tr>
          <tr><td style="padding:12px 0;color:#6b7280;vertical-align:top"><strong>${t.message}</strong></td><td style="padding:12px 0;white-space:pre-wrap">${(message || t.none).replace(/\n/g, '<br>')}</td></tr>
        </table>
      </div>
      <div style="text-align:center;padding:16px;font-size:12px;color:#9ca3af"><p>Sent from ZprintPro Website</p></div>
    </div>`;

    // 处理附件为 base64
    const attachments = await Promise.all(
      validFiles.map(async (file) => ({
        filename: file.name,
        content: Array.from(new Uint8Array(await file.arrayBuffer())),
      }))
    );

    const resendKey = context.env.RESEND_API_KEY;
    if (!resendKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'RESEND_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resendBody: any = {
      from: 'ZprintPro <noreply@zprintpro.com>',
      to: 'zprintpro@outlook.com',
      reply_to: email || undefined,
      subject: `[${t.title}] ${name || 'New Client'} - ${category || 'General'}`,
      html: htmlContent,
    };

    if (attachments.length > 0) {
      resendBody.attachments = attachments.map((a) => ({
        filename: a.filename,
        content: btoa(String.fromCharCode(...a.content)),
      }));
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendBody),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      throw new Error(`Resend error: ${err}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
