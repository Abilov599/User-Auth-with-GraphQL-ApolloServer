import mongoose, { Document, Model, Schema } from "mongoose";

// Define the interface for the User document
interface UserDocument extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  secret: string;
}

// Define the User schema
const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    secret: { type: String, default: "" },
  },
  { timestamps: true }
);

// Define and export the User model
const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);

export { User, UserDocument };
