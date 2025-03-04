import Category from "../models/categoryModel";
import { Request,Response } from "express";


export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
 };

 