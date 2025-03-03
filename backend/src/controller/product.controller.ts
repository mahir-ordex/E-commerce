import { Request, Response } from "express";
import Product from "../models/productModel";
import Seller from "../models/sellerModel";
import cloudinary from "cloudinary";

interface AuthenticatedRequest extends Request {
  user?: { _id: string };
}

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find({}).select("-timestamp");
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id).select("-timestamp");
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, category, image, quantity } = req.body;
    if (!name || !description || !price || !category || !image || !quantity) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const sellerShop = await Seller.findOne({ ownerId: req.user._id });
    if (!sellerShop) {
      res.status(404).json({ message: "Seller shop not found" });
      return;
    }

    const uploadedImages = await Promise.all(
      image.map(async (img: string) => {
        const cloudinaryResult = await cloudinary.v2.uploader.upload(img, {
          folder: "ecommerce/products",
          width: 1200,
          height: 1200,
          crop: "limit",
        });
        return cloudinaryResult.secure_url;
      })
    );

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image: uploadedImages,
      quantity,
      shopId: sellerShop._id,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error: any) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateProduct = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id: productId } = req.params;
    const updateDetail = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!productId) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    const sellerShop = await Seller.findOne({ ownerId: req.user._id });
    if (!sellerShop) {
      res.status(404).json({ message: "Seller shop not found" });
      return;
    }

    if (updateDetail.image) {
      const uploadedImages = await Promise.all(
        updateDetail.image.map(async (img: string) => {
          const cloudinaryResult = await cloudinary.v2.uploader.upload(img, {
            folder: "ecommerce/products",
            width: 1200,
            height: 1200,
            crop: "limit",
          });
          return cloudinaryResult.secure_url;
        })
      );
      updateDetail.image = uploadedImages;
    }

    const product = await Product.findOne({
      _id: productId,
      sellerId: req.user._id,
    });

    if (!product) {
      res
        .status(404)
        .json({ message: "Product not found or unauthorized access" });
      return;
    }

    Object.assign(product, updateDetail);
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err: any) {
    console.error("Error updating product:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const deleteProduct = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id: productId } = req.params;
  if (!productId) {
    res.status(400).json({ message: "Product ID is required" });
    return;
  }
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err: any) {
    console.error("Error deleting product:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
