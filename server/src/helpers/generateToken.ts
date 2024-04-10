import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error("JWT secret is not defined.");
  }

  try {
    const token = jwt.sign({ userId }, secret, {
      expiresIn: '1d'
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token.");
  }
};
