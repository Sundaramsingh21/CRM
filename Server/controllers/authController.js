import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import userModel from "../models/userModel.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 🔹 Basic Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        // 🔹 Email Format Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: false,
                message: "Invalid email format"
            });
        }

        // 🔹 Password Length Validation
        if (password.length < 5) {
            return res.status(400).json({
                status: false,
                message: "Password must be at least 5 characters long"
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role: "sales",
            status: "pending"
        });

        res.status(201).json({status: true, message: "Registration successful. Awaiting admin approval."});

    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ success: false, message: "Server error during registration" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: false, message: "User Not Found" });
        }

        if (user.status !== "approved") {
            return res.status(403).json({
                status: false,
                message: "Account not approved yet"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Invalid credentials" });
        }

        const token = generateToken(user);

        res.json({
            status: true,
            token,
            name: user.name,
            message: "Login successful"

        });
    } catch (error) {
        console.error("Login fail:", error.message);
        res.status(500).json({ success: false, message: "Error occur during login" });
    }
};

//admin can get all users
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        res.status(200).json({ status: true, users });
    } catch (error) {
        console.log("error in getting all users:", error.message)
    }
};

// admin can get all pending status user 
const getPendingUsers = async (req, res) => {
    try {
        const users = await userModel.find({ status: "pending" }).select("-password");
        res.status(200).json({ status: true, users });
    } catch (error) {
        console.log("error in getting pending status users:", error.message)
    }
};

const approveUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = "approved";
        user.approvedBy = req.user.id;

        await user.save();

        res.json({ status: true, message: "User approved successfully" });
    } catch (error) {
        console.log("error in approving user:", error.message)
    }
};

//Admin can reject sales user
const rejectUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = "rejected";
        user.approvedBy = req.user.id;

        await user.save();

        res.json({ status: true, message: "User rejected successfully" });
    } catch (error) {
        console.log("error in rejecting user:", error.message);
    }
};

//admin can directly create sales user
const createSalesUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 🔹 Basic Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        // 🔹 Email Format Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: false,
                message: "Invalid email format"
            });
        }

        // 🔹 Password Length Validation
        if (password.length < 5) {
            return res.status(400).json({
                status: false,
                message: "Password must be at least 5 characters long"
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role: "sales",
            status: "approved",
            approvedBy: req.user.id
        });

        res.status(201).json({
            status: true,
            message: "Sales user created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ success: false, message: "Server error during registration" });
    }
};


export { login, register, getUsers, getPendingUsers, approveUser, rejectUser, createSalesUser }