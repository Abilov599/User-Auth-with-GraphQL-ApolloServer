import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PASSWORD = process.env.PASSWORD;
const MONGODB_URI = process.env.MONGODB_URI.replace("<password>", PASSWORD);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
