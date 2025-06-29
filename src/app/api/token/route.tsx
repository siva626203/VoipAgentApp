import { NextResponse } from "next/server";
import { jwt } from "twilio";
const { AccessToken } = jwt;
const { VoiceGrant } = AccessToken;

export async function GET() {
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID!;
  const twilioApiKey = process.env.TWILIO_API_KEY!;
  const twilioApiSecret = process.env.TWILIO_API_SECRET!;
  const twilioAppSid = process.env.TWILIO_APP_SID!; // TwiML App SID

  const identity = "agent-" + Math.floor(Math.random() * 99999);
  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: twilioAppSid,
    incomingAllow: true,
  });

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity }
  );
  token.addGrant(voiceGrant);

  return NextResponse.json({ token: token.toJwt(), identity });
}
