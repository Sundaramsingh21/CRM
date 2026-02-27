import express from "express";
import { register, login, getUsers, getPendingUsers, createSalesUser, approveUser, rejectUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";


const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

//admin routes
authRouter.get("/sales/users", protect, authorize("admin"), getUsers);
authRouter.get("/pending", protect, authorize("admin"), getPendingUsers);
authRouter.post("/create/sales/user", protect, authorize("admin"), createSalesUser);
authRouter.put("/:id/approve", protect, authorize("admin"), approveUser);
authRouter.put("/:id/reject", protect, authorize("admin"), rejectUser);

export default authRouter;