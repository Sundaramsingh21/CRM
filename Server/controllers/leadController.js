import leadModel from "../models/leadModel.js";
import userModel from "../models/userModel.js";
import dealModel from "../models/dealModel.js";

const createLead = async (req, res) => {
    try {
        const { name, email, phone, company, status, assignedTo } = req.body;

        if (!name) {
            return res.status(400).json({
                status: false,
                message: "Lead name is required"
            });
        }

        let finalAssignedUser;

        if (req.user.role === "admin") {
            if (!assignedTo) {
                return res.status(400).json({
                    status: false,
                    message: "Admin must assign lead to a sales user, please send sales id."
                });
            }
            finalAssignedUser = assignedTo;
        } else {
            finalAssignedUser = req.user.id;
        }

        const lead = await leadModel.create({
            name,
            email,
            phone,
            company,
            status,
            assignedTo: finalAssignedUser
        });

        res.status(201).json({
            status: true,
            message: "Lead created successfully",
            lead
        });

    } catch (error) {
        console.error("Create lead error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error while creating lead"
        });
    }
};

const getLeads = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { search, status } = req.query;

        let query = {};

        // Role-based filtering
        if (req.user.role === "sales") {
            query.assignedTo = req.user.id;
        }

        // Status filter
        if (status) {
            query.status = status;
        }

        // Search filter
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } }
            ];
        }

        const totalLeads = await leadModel.countDocuments(query);

        const leads = await leadModel.find(query)
            .populate("assignedTo", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            status: true,
            pagination: {
                totalLeads,
                totalPages: Math.ceil(totalLeads / limit),
                currentPage: page,
                limit
            },
            leads
        });

    } catch (error) {
        console.error("Get leads error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error while fetching leads"
        });
    }
};

const getLeadById = async (req, res) => {
    try {
        const lead = await leadModel.findById(req.params.id)
            .populate("assignedTo", "name email");

        if (!lead) {
            return res.status(404).json({
                status: false,
                message: "Lead not found"
            });
        }

         const q = {
            lead : lead._id
        }
        const deal = await dealModel.find(q);

        // Ownership check
        if (
            req.user.role === "sales" &&
            lead.assignedTo._id.toString() !== req.user.id
        ) {
            return res.status(403).json({
                status: false,
                message: "Not authorized"
            });
        }

        res.status(200).json({
            status: true,
            lead,
            deal
        });

    } catch (error) {
        console.error("Get lead error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

const updateLead = async (req, res) => {
    try {
        const lead = await leadModel.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                status: false,
                message: "Lead not found"
            });
        }

        // Ownership check
        if (
            req.user.role === "sales" &&
            lead.assignedTo.toString() !== req.user.id
        ) {
            return res.status(403).json({
                status: false,
                message: "Not authorized"
            });
        }

        Object.assign(lead, req.body);

        await lead.save();

        res.status(200).json({
            status: true,
            message: "Lead updated successfully",
            lead
        });

    } catch (error) {
        console.error("Update lead error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};
const deleteLead = async (req, res) => {
    try {
        const lead = await leadModel.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                status: false,
                message: "Lead not found"
            });
        }

        if (
            req.user.role === "sales" &&
            lead.assignedTo.toString() !== req.user.id
        ) {
            return res.status(403).json({
                status: false,
                message: "Not authorized"
            });
        }

        //CHECK IF DEAL EXISTS FOR THIS LEAD
        const existingDeal = await dealModel.findOne({ lead: lead._id });

        if (existingDeal) {
            return res.status(400).json({
                status: false,
                message: "Cannot delete lead because a deal exists for this lead"
            });
        }

        await lead.deleteOne();

        res.status(200).json({
            status: true,
            message: "Lead deleted successfully"
        });

    } catch (error) {
        console.error("Delete lead error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

const getUserWithLeads = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        const leads = await leadModel.find({ assignedTo: user._id });

        res.status(200).json({
            status: true,
            user,
            leads
        });

    } catch (error) {
        console.error("Error fetching user leads:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};


export { createLead, getLeads, getLeadById, updateLead, deleteLead, getUserWithLeads }


