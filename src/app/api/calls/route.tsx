import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CallLog } from "@/lib/models/CallLogs";

export async function GET() {
  await connectDB();
  const logs = await CallLog.find().sort({ start_time: -1 }).limit(50);
  return NextResponse.json(logs);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();

  const log = await CallLog.create({
    ...data,
    start_time: new Date(data.start_time || Date.now()),
  });

  return NextResponse.json(log, { status: 201 });
}
