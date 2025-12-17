import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    budget: { type: String },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
