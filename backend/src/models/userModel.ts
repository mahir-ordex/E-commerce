import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Define User Interface
export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: "consumer" | "seller" | "admin";
  password: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define User Schema
const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, "Please enter a valid phone number"],
    },
    address: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["consumer", "seller", "admin"],
      default: "consumer",
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
