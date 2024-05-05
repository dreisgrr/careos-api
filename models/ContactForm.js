import mongoose from "mongoose";

const ContactFormSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    agentCount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ContactForm", ContactFormSchema);
