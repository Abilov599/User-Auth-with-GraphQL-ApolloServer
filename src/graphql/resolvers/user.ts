import { User } from "../../model/user.js";
import { register, login } from "../../controller/user.js";

// Provide resolver functions for the GraphQL schema
const resolvers = {
  Query: {
    getAllUsers: () => User.find(),
  },
  Mutation: {
    register,
    login,
  },
};

export default resolvers;

// changePassword: async ({
//   email,
//   oldPassword,
//   newPassword,
// }: {
//   email: string;
//   oldPassword: string;
//   newPassword: string;
// }) => {
//   // Find the user by email
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("User not found");
//   }

//   // Validate the old password
//   const validPassword = await bcrypt.compare(oldPassword, user.password);
//   if (!validPassword) {
//     throw new Error("Invalid password");
//   }

//   // Hash and save the new password
//   const hashedPassword = await bcrypt.hash(newPassword, 10);
//   user.password = hashedPassword;
//   await user.save();

//   return "Password changed successfully";
// },
// enableTwoFactorAuth: ({ email }: { email: string }) => {
//   // Replace this with proper user lookup
//   const user = User.find((user: User) => user.email === email);
//   if (!user) {
//     throw new Error("User not found");
//   }

//   // Generate a new secret for two-factor authentication
//   const secret = speakeasy.generateSecret().base32;
//   user["secret"] = secret;
//   return secret;
// },
// verifyTwoFactorAuth: ({
//   email,
//   token,
// }: {
//   email: string;
//   token: string;
// }) => {
//   // Replace this with proper user lookup
//   const user = User.find((user: User) => user.email === email);
//   if (!user) {
//     throw new Error("User not found");
//   }

//   // Verify the token with the stored secret
//   const verified = speakeasy.totp.verify({
//     secret: user["secret"],
//     encoding: "base32",
//     token,
//   });

//   return verified
//     ? "Two-factor authentication successful"
//     : "Invalid token";
// },
