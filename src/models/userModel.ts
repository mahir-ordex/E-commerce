import mongoose, { Schema, Document } from 'mongoose';

// Define User Interface
export interface IUser extends Document {
    name: string;
    email: string;
    phoneNumber?: string;
    address?: string;
    role: "consumer" | "seller" | "admin";
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        phoneNumber: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        role: {
            type: String,
            enum: ["consumer", "seller", "admin"],
            default: "consumer"
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);
  

const User = mongoose.model<IUser>('User', userSchema);
export default User;
