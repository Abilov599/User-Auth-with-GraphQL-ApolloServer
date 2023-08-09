import { User, UserDocument } from "../model/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config();

// User registration with hashing password
async function register(_, { email, username, password }) {
  if (!email || !username || !password) {
    throw new Error(
      "Missing required fields. Please provide email, username, and password."
    );
  }
  // Check if the username or email already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new Error("Username or email already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user: UserDocument = new User({
    email,
    username,
    password: hashedPassword,
  });

  // Save the user to the database
  const registeredUser = await user.save();
  registeredUser.password = "🫣";
  return registeredUser;
}

// User login with JWT
async function login(_, { email, password }, context) {
  if (!email || !password) {
    throw new Error(
      "Missing required fields. Please provide email or username, and password."
    );
  }
  // Check if the username or email already exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User with this email not found");
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // If passwords match, generate a JWT token and return it
  if (isPasswordValid) {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    context.res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // Cookie expiry time in milliseconds (1 day)
    });
    return "Login successful";
  } else {
    throw new Error("Invalid password");
  }
}

export { register, login };
