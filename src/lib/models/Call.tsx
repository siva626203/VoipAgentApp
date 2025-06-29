import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  direction: { type: String, enum: ["inbound", "outbound"], required: true },
  status: {
    type: String,
    enum: ["completed", "failed", "missed"],
    required: true,
  },
  call_sid: { type: String },
  start_time: { type: Date },
  end_time: { type: Date },
  duration_seconds: { type: Number },
  was_recorded: { type: Boolean, default: false },
  recording_url: { type: String },
  transcript: { type: String },
  ai_summary: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Call", callSchema);
