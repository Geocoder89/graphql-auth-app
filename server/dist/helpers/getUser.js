import jwt from 'jsonwebtoken';
import { prisma } from "../db.js";
export const getUser = async (token) => {
    try {
        // Remove "Bearer " from the token and any leading/trailing spaces
        const formattedToken = token.replace(/^Bearer\s+/i, '').trim();
        if (!formattedToken) {
            // Token is empty
            return null;
        }
        // Verify the token
        const decodedToken = jwt.verify(formattedToken, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const user = await prisma.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true
            }
        });
        return user;
    }
    catch (error) {
        console.error(`Error retrieving user ${error}`);
        return null;
    }
};
