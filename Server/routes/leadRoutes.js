import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createLead, deleteLead, getLeadById, getLeads, getUserWithLeads, updateLead } from "../controllers/leadController.js";
import { authorize } from "../middleware/roleMiddleware.js";

const leadRouter = express.Router();

leadRouter.use(protect);

leadRouter.post("/", createLead);
leadRouter.get("/", getLeads);
leadRouter.get("/:id", getLeadById);
leadRouter.put("/:id", updateLead);
leadRouter.delete("/:id", deleteLead);
//admin route only
leadRouter.get("/:id/leads", authorize("admin"), getUserWithLeads);

export default leadRouter;