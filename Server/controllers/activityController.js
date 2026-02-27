import activityModel from "../models/activityModel.js";
import leadModel from "../models/leadModel.js";


const createActivity = async (req, res) => {
    try {
        const { type, notes, lead, reminderDate } = req.body;

        if (!type || !notes || !lead) {
            return res.status(400).json({
                status: false,
                message: "Type, notes and lead are required"
            });
        }

        const existingLead = await leadModel.findById(lead);

        if (!existingLead) {
            return res.status(404).json({
                status: false,
                message: "Lead not found"
            });
        }

        //Sales can log only for their own leads
        if (
            req.user.role === "sales" &&
            existingLead.assignedTo.toString() !== req.user.id
        ) {
            return res.status(403).json({
                status: false,
                message: "Not authorized"
            });
        }

        const activity = await activityModel.create({
            type,
            notes,
            lead,
            reminderDate,
            performedBy: req.user.id
        });

        res.status(201).json({
            status: true,
            message: "Activity logged successfully",
            activity
        });

    } catch (error) {
        console.error("Create activity error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

const getActivities = async (req, res) => {
    try {
        const { lead, type } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let query = {};

        if (lead) {
            query.lead = lead;
        }

        if (type) {
            query.type = type;
        }

        if (req.user.role === "sales") {
            query.performedBy = req.user.id;
        }

        const totalActivities = await activityModel.countDocuments(query);

        const activities = await activityModel.find(query)
            .populate("lead", "name company")
            .populate("performedBy", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            status: true,
            pagination: {
                totalActivities,
                totalPages: Math.ceil(totalActivities / limit),
                currentPage: page
            },
            activities
        });

    } catch (error) {
        console.error("Get activities error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

const getActivityById = async (req, res) => {
    try {
        const activity = await activityModel.findById(req.params.id)
            .populate("lead", "name company")
            .populate("performedBy", "name email");

        if (!activity) {
            return res.status(404).json({
                status: false,
                message: "Activity not found"
            });
        }

        res.status(200).json({
            status: true,
            activity
        });

    } catch (error) {
        console.error("Get activity error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

const deleteActivity = async (req, res) => {
    try {
        const activity = await activityModel.findById(req.params.id);

        if (!activity) {
            return res.status(404).json({
                status: false,
                message: "Activity not found"
            });
        }

        if (
            req.user.role === "sales" &&
            activity.performedBy.toString() !== req.user.id
        ) {
            return res.status(403).json({
                status: false,
                message: "Not authorized"
            });
        }

        await activity.deleteOne();

        res.status(200).json({
            status: true,
            message: "Activity deleted successfully"
        });

    } catch (error) {
        console.error("Delete activity error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

const updateActivity = async (req, res) => {
    try {
        const { type, notes, reminderDate } = req.body;

        const activity = await activityModel.findById(req.params.id);

        if (!activity) {
            return res.status(404).json({
                status: false,
                message: "Activity not found"
            });
        }

        //Sales user can edit only their own activities
        if (
            req.user.role === "sales" &&
            activity.performedBy.toString() !== req.user.id
        ) {
            return res.status(403).json({
                status: false,
                message: "Not authorized"
            });
        }

        //Update fields if provided
        if (type) activity.type = type;
        if (notes) activity.notes = notes;
        if (reminderDate !== undefined) activity.reminderDate = reminderDate;

        await activity.save();

        res.status(200).json({
            status: true,
            message: "Activity updated successfully",
            activity
        });

    } catch (error) {
        console.error("Update activity error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};
export { createActivity, getActivities, getActivityById, deleteActivity, updateActivity }