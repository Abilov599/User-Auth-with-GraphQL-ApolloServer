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



//   return verified
//     ? "Two-factor authentication successful"
//     : "Invalid token";
// },
