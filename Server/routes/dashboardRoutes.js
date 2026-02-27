import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardOverview, getMonthlyRevenue, getSalesPerformance } from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.use(protect);

dashboardRouter.get("/overview", getDashboardOverview);
dashboardRouter.get("/sales-performance", getSalesPerformance);
dashboardRouter.get("/monthly-revenue", getMonthlyRevenue);

export default dashboardRouter;