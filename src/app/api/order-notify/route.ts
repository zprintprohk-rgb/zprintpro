import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Forward to same email channel as FormSubmit
    await fetch('https://formsubmit.co/zprintpro@outlook.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _subject: 'New Order '+ body.orderId, ...body }),
    });
    return NextResponse.json({ success: true, orderId: body.orderId });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
