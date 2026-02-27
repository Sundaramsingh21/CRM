import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String
    },

    phone: {
      type: String
    },

    company: {
      type: String
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "converted"],
      default: "new"
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    }
  },
  { timestamps: true }
);

const leadModel = mongoose.models.lead || mongoose.model("lead", leadSchema);

export default leadModel;