import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["personal", "work"],
    default: "personal",
  },
  date: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
    default: "high",
  },

  status: {
    type: String,
    enum: ["completed", "incomplete"],
    default: "incomplete",
  },
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
}

});
export default mongoose.model("Task", taskSchema);
