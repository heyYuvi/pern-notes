import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes  from "./routes/user.routes.js";
import noteRoutes  from "./routes/note.routes.js";
import cookieParser from "cookie-parser";
import protect from "./middlewares/auth.middleware.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.get("/", protect, (req, res) =>{
    res.json({
        success: true,
        message: "PERN API is running"
    });
});

app.use("/api", userRoutes);
app.use("/api", noteRoutes);

export default app;