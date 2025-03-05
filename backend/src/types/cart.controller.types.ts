import { Request} from "express";
import mongoose from "mongoose";



export interface AuthenticatedRequest extends Request {
    user?: { id: string };
  }
export interface CartItem {
    productId: mongoose.Types.ObjectId; // Ensure it's an ObjectId
    quantity: number;
  }