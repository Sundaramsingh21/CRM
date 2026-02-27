import dealModel from "../models/dealModel.js";
import leadModel from "../models/leadModel.js";

const createDeal = async (req, res) => {
    try {
        const { title, amount, stage, lead } = req.body;

        if (!title || !amount || !lead) {
            return res.status(400).json({
                status: false,
                message: "Title, amount and lead id are required"
            });
        }

        const existingLead = await leadModel.findById(lead);

        if (!existingLead) {
            return res.status(404).json({
                status: false,
                message: "Lead not found"
            });
        }

        //Sales user can create deal only for own leads
        if (req.user.role === "sales" && existingLead.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({
                status: false,
                message: "Not authorized to create deal for this lead"
            });
        }

        const deal = await dealModel.create({
            title,
            amount,
            stage,
            lead,
            assignedTo: existingLead.assignedTo
        });

        res.status(201).json({
            status: true,
            message: "Deal created successfully",
            deal
        });

    } catch (error) {
        console.error("Create deal error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

const getDeals = async (req, res) => {
    try {
        const { stage } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let query = {};

        if (req.user.role === "sales") {
            query.assignedTo = req.user.id;
        }

        if (stage) {
            query.stage = stage;
        }

        const totalDeals = await dealModel.countDocuments(query);

        const deals = await dealModel.find(query)
            .populate("lead", "name company")
            .populate("assignedTo", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            status: true,
            pagination: {
                totalDeals,
                totalPages: Math.ceil(totalDeals / limit),
                currentPage: page
            },
            deals
        });

    } catch (error) {
        console.error("Get deals error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

const getDealById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.json({ status: false, message: "Please pass deal id" })
        }
        const deal = await dealModel.findById(req.params.id)
            .populate("lead", "name company email")
            .populate("assignedTo", "name email");

        if (!deal) {
            return res.status(404).json({
                status: false,
                message: "Deal not found"
            });
        }

        //Sales can view only own deals
        if (
            req.user.role === "sales" &&
            deal.assignedTo._id.toString() !== req.user.id
        ) {
            return res.status(403).json({
                status: false,
                message: "Not authorized"
            });
        }

        res.status(200).json({
            status: true,
            deal
        });

    } catch (error) {
        console.error("Get deal error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

const updateDeal = async (req, res) => {
    try {
        const deal = await dealModel.findById(req.params.id);

        if (!deal) {
            return res.status(404).json({
                status: false,
                message: "Deal not found"
            });
        }

        //Ownership check
        if (
            req.user.role === "sales" &&
            deal.assignedTo.toString() !== req.user.id
        ) {
            return res.status(403).json({
                status: false,
                message: "Not authorized"
            });
        }

        const { title, amount, stage } = req.body;

        if (title) deal.title = title;
        if (amount) deal.amount = amount;
        if (stage) deal.stage = stage;

        await deal.save();

        res.status(200).json({
            status: true,
            message: "Deal updated successfully",
            deal
        });

    } catch (error) {
        console.error("Update deal error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

const deleteDeal = async (req, res) => {
    try {
        const deal = await dealModel.findById(req.params.id);

        if (!deal) {
            return res.status(404).json({
                status: false,
                message: "Deal not found"
            });
        }

        //Sales can delete only own deals
        if (
            req.user.role === "sales" &&
            deal.assignedTo.toString() !== req.user.id
        ) {
            return res.status(403).json({
                status: false,
                message: "Not authorized"
            });
        }

        await deal.deleteOne();

        res.status(200).json({
            status: true,
            message: "Deal deleted successfully"
        });

    } catch (error) {
        console.error("Delete deal error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

export { createDeal, getDeals, getDealById, updateDeal, deleteDeal }