import jwt from 'jsonwebtoken';
export const verifyToken = (token) => {
    try {
        console.log(token, 'this is the token');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const { userId, email } = decoded;
        return { userId, email };
    }
    catch (error) {
        throw new Error('Invalid Token');
    }
};
