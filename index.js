import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import roomRoutes from "./routes/roomRoute.js";
import bookingRoutes from "./routes/bookingRoute.js";
import cors from "cors";
import path from "path";

const __dirname = path.resolve();

// configure env
dotenv.config();

// databse config
connectDB();

const app = express();

// middelwares
app.use(express.json());
app.use(cors());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "./public")));

// Serve product images
app.use(
    "/room-images",
    express.static(path.join(__dirname, "./public/roomImages"))
);

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/booking-requests", bookingRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Backend server is running!"));
