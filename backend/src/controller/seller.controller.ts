import { Response } from 'express';
import Seller from '../models/sellerModel';
import User from '../models/userModel';
import { AuthenticatedRequest } from '../types/cart.controller.types';
import mongoose from 'mongoose';

export const createShop = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { shopName, shopDescription, shopAddress } = req.body;
        const ownerId = req.user?.id;

        if (!shopName || !shopDescription || !shopAddress) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }

        const newShop = new Seller({
            ownerId,
            shopName,
            shopDescription,
            shopAddress
        });

        await newShop.save();
        res.status(201).json({ message: "Shop created successfully", shop: newShop });
        return;
    } catch (error: any) {
        res.status(500).json({ error: "Internal server error", details: error.message });
        return;
    }
};

export const updateShop = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { ...updatedData } = req.body;
        const ownerId: string | undefined = req?.user?.id;

        if (!ownerId || !mongoose.Types.ObjectId.isValid(ownerId)) {
            res.status(400).json({ success: false, error: "Invalid ownerId format" });
            return;
        }

        const shop = await Seller.findOne({ ownerId: new mongoose.Types.ObjectId(ownerId) });

        if (!shop) {
            res.status(404).json({ success: false, error: "Shop not found!" });
            return;
        }

        if (shop.ownerId.toString() !== ownerId) {
            res.status(403).json({ success: false, error: "Shop Owner must match the Logged-in User" });
            return;
        }

        const updatedShop = await Seller.findByIdAndUpdate(shop.id, updatedData, { new: true });

        res.status(200).json({ success: true, data: updatedShop });
        return;
    } catch (error: any) {
        console.error("Error updating shop:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
};

export const getShopData = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.body;
        const shops = await Seller.findById(id);

        if (!shops) {
            res.status(404).json({ success: false, error: "Shop not found!" });
            return;
        }

        res.status(200).json({ success: true, data: shops });
        return;
    } catch (error) {
        console.error("Error fetching shop Data:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
};

