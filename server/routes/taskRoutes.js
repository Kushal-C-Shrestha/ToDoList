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
router.get("/", async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("User ID:", userId);
        const tasks = await Task.find({ userId });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Server error" });
    }
});


router.post("/", async (req, res) => {
    try {
        const { title, description, type, date, priority } = req.body;
        const userId = req.user.id; // Get the user ID from the token
        console.log(req.body);
        console.log("User ID:", userId);
        const newTask=new Task({
            title,
            description, 
            type:type.toLowerCase(),
            date:new Date(date),
            priority:priority.toLowerCase(),
            userId: userId // Set the userId field
        })

        await newTask.save();
        res.status(201).json(newTask);
        console.log("Task created successfully:", newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/", async (req, res) => {
    try {
        console.log("Delete request received");
        console.log("Request body:", req.body);
        const { ids } = req.body; // Expecting an array of task IDs to delete
        console.log("IDs to delete:", ids);
        const userId = req.user.id; // Get the user ID from the token

        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ error: "Invalid request data" });
        }

        // Delete tasks that match the provided IDs and belong to the user
        const result = await Task.deleteMany({ _id: { $in: ids }, userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "No tasks found to delete" });
        }
        res.status(201).json({ message: "Tasks deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        console.error("Error deleting tasks:", error);
        res.status(500).json({ error: "Server error" });
    }
});


router.patch("/", async (req, res) => {
    try {
        console.log("Patch request received");
        const { ids } = req.body; // Expecting an array of task IDs to mark as complete
        const userId = req.user.id; // Get the user ID from the token

        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ error: "Invalid request data" });
        }

        // Update tasks that match the provided IDs and belong to the user
        const result = await Task.updateMany(
            { _id: { $in: ids }, userId },
            { $set: { status: "completed" } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "No tasks found to update" });
        }

        res.json({ message: "Tasks marked as completed successfully", modifiedCount: result.modifiedCount });
    } catch (error) {
        console.error("Error updating tasks:", error);
        res.status(500).json({ error: "Server error" });
    }
});


router.put("/:id",async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, type, date, priority } = req.body;
        const userId = req.user.id; // Get the user ID from the token

        // Find the task by ID and update it
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId }, // Ensure the task belongs to the user
            { title, description, type: type.toLowerCase(), date: new Date(date), priority: priority.toLowerCase() },
            { new: true } // Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found or does not belong to the user" });
        }

        return res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Server error" });
    }
})

export default router;
