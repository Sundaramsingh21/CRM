import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        amount: {
            type: Number,
            required: true
        },

        stage: {
            type: String,
            enum: ["Prospect", "Negotiation", "Won", "Lost"],
            default: "Prospect"
        },

        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "lead",
            required: true
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
    },
    { timestamps: true }
);

const dealModel = mongoose.models.deal || mongoose.model("deal", dealSchema);

export default dealModel;