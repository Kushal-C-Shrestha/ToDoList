import express from "express";
import cors from "cors";
import Task from "../model/Task.js";
import bodyParser from "body-parser";
import { verifyToken } from "./auth.js"; // Import the verifyToken middleware


const router = express.Router();

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Middleware to enable CORS
router.use(cors()); 

// Get all tasks
router.get("/", verifyToken, async (req, res) => {
    console.log("Fetching tasks for user:", req.user.id);
    try {
        const userId = req.user.id;
        const tasks = await Task.find({ userId });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
