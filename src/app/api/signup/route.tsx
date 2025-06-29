import { connectDB } from "@/lib/db";
import { Agent } from "@/lib/models/Agent";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { name, email, password } = await req.json();

  const existing = await Agent.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { error: "Agent already exists" },
      { status: 409 }
    );
  }

  const password_hash = await bcrypt.hash(password, 10);
  const agent = await Agent.create({ name, email, password_hash });

  return NextResponse.json({ success: true, agent });
}
