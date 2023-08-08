import { User, UserDocument } from "../model/user.js";
import bcrypt from "bcrypt";

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

export { register };
