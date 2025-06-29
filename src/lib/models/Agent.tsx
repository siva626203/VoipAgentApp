import mongoose, { Schema, model, models } from "mongoose";

const agentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ["admin", "agent"], default: "agent" },
  created_at: { type: Date, default: Date.now },
});

export const Agent = models.Agent || model("Agent", agentSchema);
