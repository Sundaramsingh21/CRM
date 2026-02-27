import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "../config/db.js";
import userModel from "../models/userModel.js";

dotenv.config();

const seedAdmin = async () => {
    await connectDB();

    const existingAdmin = await userModel.findOne({ role: "admin" });

    if (existingAdmin) {
        console.log("Admin already exists");
        process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Admin@123", salt);

    await userModel.create({
        name: "Super Admin",
        email: "admin@crm.com",
        password: hashedPassword,
        role: "admin",
        status: "approved"
    });

    console.log("Admin created successfully");
    process.exit();
};

seedAdmin();