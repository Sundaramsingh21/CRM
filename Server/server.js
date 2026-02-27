import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import leadRouter from './routes/leadRoutes.js';
import dealRouter from './routes/dealRoutes.js';
import activityRouter from './routes/activityRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';
// import morgan from 'morgan';

// Initialize
dotenv.config();
const app = express();

//Connect to Database
await connectDB();

// server port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://crm-pro-app.onrender.com"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization","token"],
}));
// app.use(morgan("dev"));

//endpoints
app.use("/api/auth", authRouter);
app.use("/api/leads", leadRouter);
app.use("/api/deals", dealRouter);
app.use("/api/activities", activityRouter);
app.use("/api/dashboard", dashboardRouter);

//Health Checkup
app.get('/', (req, res) => res.send('Server Started'));

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);

});

