import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createActivity, deleteActivity, getActivities, getActivityById, updateActivity } from "../controllers/activityController.js";

const activityRouter = express.Router();

activityRouter.use(protect);

activityRouter.post("/add", createActivity);
activityRouter.get("/", getActivities);
activityRouter.get("/:id", getActivityById);
activityRouter.delete("/:id", deleteActivity);
activityRouter.put("/:id", updateActivity);

export default activityRouter;