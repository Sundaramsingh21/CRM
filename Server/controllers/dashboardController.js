import dealModel from "../models/dealModel.js";
import leadModel from "../models/leadModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";


const getDashboardOverview = async (req, res) => {
    try {
        let leadMatch = {};
        let dealMatch = {};

        //If sales → filter by assignedTo
        if (req.user.role === "sales") {
            const userId = new mongoose.Types.ObjectId(req.user.id);
            leadMatch.assignedTo = userId;
            dealMatch.assignedTo = userId;
        }
        //LEAD STATS
        const totalLeads = await leadModel.countDocuments(leadMatch);

        const leadStatus = await leadModel.aggregate([
            { $match: leadMatch },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        //DEAL STATS
        const totalDeals = await dealModel.countDocuments(dealMatch);

        const dealStage = await dealModel.aggregate([
            { $match: dealMatch },
            {
                $group: {
                    _id: "$stage",
                    count: { $sum: 1 }
                }
            }
        ]);

        //REVENUE-Closed Won
        const revenueData = await dealModel.aggregate([
            {
                $match: {
                    ...dealMatch,
                    stage: "Won"
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$amount" }
                }
            }
        ]);

        const totalRevenue = revenueData[0]?.totalRevenue || 0;

        res.status(200).json({
            status: true,
            role: req.user.role,
            leads: {
                total: totalLeads,
                breakdown: leadStatus
            },
            deals: {
                total: totalDeals,
                breakdown: dealStage
            },
            revenue: totalRevenue
        });

    } catch (error) {
        console.error("Dashboard overview error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};
//admin only
const getSalesPerformance = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                status: false,
                message: "Only admin can access this"
            });
        }

        const performance = await dealModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "assignedTo",
                    foreignField: "_id",
                    as: "sales"
                }
            },
            { $unwind: "$sales" },
            {
                $group: {
                    _id: "$assignedTo",
                    salesName: { $first: "$sales.name" },
                    totalDeals: { $sum: 1 },
                    revenue: {
                        $sum: {
                            $cond: [
                                { $eq: ["$stage", "Won"] },
                                "$amount",
                                0
                            ]
                        }
                    }
                }
            }
        ]);

        res.status(200).json({
            status: true,
            performance
        });

    } catch (error) {
        console.error("Sales performance error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

//for both admin and sales user - they can see their own
const getMonthlyRevenue = async (req, res) => {
    try {
        let match = { stage: "Won" };

        if (req.user.role === "sales") {
            match.assignedTo = new mongoose.Types.ObjectId(req.user.id);
        }

        const monthlyRevenue = await dealModel.aggregate([
            { $match: match },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalRevenue: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.status(200).json({
            status: true,
            monthlyRevenue
        });

    } catch (error) {
        console.error("Monthly revenue error:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

export { getDashboardOverview, getSalesPerformance, getMonthlyRevenue }