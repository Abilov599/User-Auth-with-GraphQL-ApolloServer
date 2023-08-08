import mongoose from "mongoose";

const MONGODB_URL =
  "mongodb+srv://abilovv599:cemi2002@cluster0.bh7quof.mongodb.net/graphql-authUser";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;