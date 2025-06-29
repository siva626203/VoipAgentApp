import mongoose from "mongoose";

const recordingSchema = new mongoose.Schema({
  call_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Call",
    required: true,
  },
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  audio_url: { type: String },
  text_prompt: { type: String },
  ai_response: { type: String },
  tts_voice_used: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recording", recordingSchema);
