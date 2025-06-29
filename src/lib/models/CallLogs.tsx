import mongoose, { Schema, model, models } from "mongoose";

const callLogSchema = new Schema({
  client_name: String,
  phone: String,
  direction: { type: String, enum: ["inbound", "outbound"] },
  status: String,
  start_time: Date,
  duration_sec: Number,
  recording_url: String,
});

export const CallLog = models.CallLog || model("CallLog", callLogSchema);
