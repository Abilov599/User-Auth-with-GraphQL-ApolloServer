import { User, UserDocument } from "../model/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
const { sign, verify } = jwt;
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
  // Hash users password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Generate a random secret key for the user
    const secret = speakeasy.generateSecret();
    // Generate QR code image and provide the URL
    const qrCodeImageUrl = await qrcode.toDataURL(secret.otpauth_url);

    const user: UserDocument = new User({
      email,
      username,
      password: hashedPassword,
      secret: secret.base32,
      qrCodeUrl: qrCodeImageUrl,
    });
    // Save the user to the database
    await user.save();
    return qrCodeImageUrl;
  } catch (error) {
    throw new Error("Error generating secret");
  }
}

// User login with JWT
async function login(_, { email, password, oneTimeCode }, context) {
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
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Verify the one-time code using the user's secret key
  const verified = speakeasy.totp.verify({
    secret: user.secret,
    encoding: "base32",
    token: oneTimeCode,
  });

  if (!verified) {
    throw new Error("Invalid one-time code");
  }

  // If passwords match, generate a JWT token and return it
  const token = sign({ userId: user._id }, process.env.SECRET, {
    expiresIn: "1h",
  });
  context.res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // Cookie expiry time in milliseconds (1 day)
  });
  return "Login successful";
}

async function authUser(_, __, context) {
  const token = context.req.cookies["token"];
  if (!token) {
    throw new Error("Authorization token missing");
  }
  const decoded = verify(token, process.env.SECRET) as {
    userId: string;
  };
  if (!decoded.userId) {
    throw new Error("Invalid token payload");
  }
  const user = await User.findOne({ _id: decoded.userId });
  if (!user) {
    throw new Error("User not found");
  }
  return "Authenticated";
}

export { register, login, authUser };
