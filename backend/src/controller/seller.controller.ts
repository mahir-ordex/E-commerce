import {Response} from 'express';
import Seller from '../models/sellerModel';
import User from '../models/userModel';
import { AuthenticatedRequest } from '../types/cart.controller.types';
import { error } from 'console';
import mongoose from 'mongoose';

export const createShop = (req: AuthenticatedRequest, res: Response) => {
    try {
        const { shopName, shopDescription, shopAddress } = req.body;
        const ownerId = req.user?.id;

        if (!shopName || !shopDescription || !shopAddress) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newShop = new Seller({
            ownerId,
            shopName,
            shopDescription,
            shopAddress
        });

        newShop.save()
            .then(() => res.status(201).json({ message: "Shop created successfully", shop: newShop }))
            .catch((err) => res.status(500).json({ error: "Error saving shop", details: err.message }));
        
    } catch (error:any) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const updateShop = async(req:AuthenticatedRequest,res:Response) =>{
  try {
     const { ...updatedData} = req.body;
     const ownerId: string | undefined = req?.user?.id;
     if (!ownerId || !mongoose.Types.ObjectId.isValid(ownerId)) {
        return res.status(400).json({ success: false, error: "Invalid ownerId format" });
      }

      const shop = await Seller.findOne({ ownerId: new mongoose.Types.ObjectId(ownerId) });
     if (!shop) {
        res.status(404).json({ success: false, error: "Shop not found!" });
        return;
    } 
    
    if (shop.ownerId.toString() !== ownerId) {
        return res.status(403).json({ success: false, error: "Shop Owner must match the Logged-in User" });
      }
    const updatedShope =await Seller.findByIdAndUpdate(shop.id,updatedData,{new:true})

    return res.status(200).json({success:true,data:{updatedShope},})

  }catch (error:any) {
    console.error("Error updating shop:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export  const getShopData = async(req:AuthenticatedRequest,res:Response) => {
    try {
        const {id} = req.body;
        const shops = await Seller.find(id)
        if(!shops){
            res.status(404).json({success:false,error:"Shop not found !"})
        }
        res.status(200).json({success:true,data:{shops},error:null})
    } catch (error) {
        console.error("Error fetching shop Data:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}




 