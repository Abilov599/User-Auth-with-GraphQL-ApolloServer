import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { sign, verify } = jwt;

function signToken(userId: string) {
  const token = sign({ userId }, process.env.SECRET, {
    expiresIn: "1h",
  });
  return token;
}

function verifyToken(token: string) {
  const decoded = verify(token, process.env.SECRET) as {
    userId: string;
  };
  return decoded;
}

export { signToken, verifyToken };
