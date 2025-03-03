import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Ensure JWT_SECRET exists at runtime
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

// Extend Express Request to include `user`
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

/**
 * Middleware to authenticate users using JWT.
 */
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return ;
    }

    const token = authHeader.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };

    req.user = decoded; // Attach user details to the request
    return next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return ;
  }
};

/**
 * Middleware to authorize users based on roles.
 * @param roles Allowed roles (e.g., ["admin", "seller", "consumer"])
 */
export const authorizeUser = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden: Access denied" })
      return;
    }
    return next();
  };
};
