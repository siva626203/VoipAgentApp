import mongoose, { mongo } from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String, required: true, unique: true },
  email: { type: String },
  location: { type: String },
  tags: [String],
  notes: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;