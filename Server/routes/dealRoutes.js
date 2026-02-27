import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createDeal, deleteDeal, getDealById, getDeals, updateDeal } from "../controllers/dealController.js";

const dealRouter = express.Router();

dealRouter.use(protect);

dealRouter.post("/add", createDeal);
dealRouter.get("/", getDeals);
dealRouter.get("/:id", getDealById);
dealRouter.put("/:id", updateDeal);
dealRouter.delete("/:id", deleteDeal);

export default dealRouter;