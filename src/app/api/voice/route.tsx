import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const to = data.get("To")?.toString() || "+6590000000";

  const twiml = new twilio.twiml.VoiceResponse();
  const dial = twiml.dial();
  dial.number(to);

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}
