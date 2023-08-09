import { User } from "../../model/user.js";
import { register, login, authUser, changePassword } from "../../controller/user.js";

// Provide resolver functions for the GraphQL schema
const resolvers = {
  Query: {
    getAllUsers: () => User.find(),
  },
  Mutation: {
    register,
    login,
    authUser,
    changePassword,
  },
};

export default resolvers;
