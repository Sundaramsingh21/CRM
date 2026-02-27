import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/CRM`).then(() => console.log("DB Connected"));
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

export default connectDB;