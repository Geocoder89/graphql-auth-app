import { userMutations } from "./users/mutations.js";
import { userQueries } from "./users/queries.js";
const resolvers = {
    Query: {
        ...userQueries
    },
    Mutation: {
        ...userMutations
    }
};
export default resolvers;
