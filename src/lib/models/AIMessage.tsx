import mongoose from "mongoose";

const aiMessageSchema = new mongoose.Schema({
  call_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Call",
    required: true,
  },
  role: { type: String, enum: ["agent", "client", "ai"], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AIMessage", aiMessageSchema);
