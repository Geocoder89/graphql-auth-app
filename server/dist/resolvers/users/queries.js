export const userQueries = {
    me: async (_, __, { user, res, token }) => {
        try {
            if (!user) {
                throw new Error('User not authenticated');
            }
            return user;
        }
        catch (error) {
            console.error(`Failed to fetch user ${error}`);
            throw new Error('Failed to fetch User');
        }
    },
};
