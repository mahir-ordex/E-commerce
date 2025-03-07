import mongoose, { Schema, Document } from 'mongoose';

export interface ISeller extends Document {
    ownerId: mongoose.Schema.Types.ObjectId;
    shopName: string;
    shopDescription?: string;
    shopAddress: string;
    products: mongoose.Schema.Types.ObjectId[];
    isVerified: boolean;
    ratings: number;
}

const sellerSchema: Schema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        shopName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        shopDescription: {
            type: String,
            default: ""
        },
        shopAddress: {
            type: String,
            required: true
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                default: []
            }
        ],
        ratings:[ {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        }],
    },
    { timestamps: true }
);

const Seller = mongoose.model<ISeller>('Seller', sellerSchema);
export default Seller;
