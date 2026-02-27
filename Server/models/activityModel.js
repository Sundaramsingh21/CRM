import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["call", "email", "meeting"],
      required: true
    },

    notes: {
      type: String,
      required: true
    },

    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lead",
      required: true
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    reminderDate: {
      type: Date
    }
  },
  { timestamps: true }
);

const activityModel = mongoose.models.activity || mongoose.model("activity", activitySchema);

export default activityModel;