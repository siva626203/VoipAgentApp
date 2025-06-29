import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import  Client  from "@/lib/models/Client";

export async function GET() {
  await connectDB();
  const clients = await Client.find().sort({ name: 1 });
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const client = await Client.create(data);
  return NextResponse.json(client, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const { _id, ...updates } = data;

  const updated = await Client.findByIdAndUpdate(_id, updates, { new: true });
  if (!updated)
    return NextResponse.json({ error: "Client not found" }, { status: 404 });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { _id } = await req.json();

  const deleted = await Client.findByIdAndDelete(_id);
  if (!deleted)
    return NextResponse.json({ error: "Client not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
