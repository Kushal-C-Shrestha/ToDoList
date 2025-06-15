import mongoose from "mongoose";
import dotenv from 'dotenv';


const connectDB = async () => {
  dotenv.config();
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/todoapp", {
      useNewUrlParser: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); // stop the app if DB connection fails
  }
};

export default connectDB;
