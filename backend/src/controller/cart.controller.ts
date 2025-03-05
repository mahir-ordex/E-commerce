import { Request, Response } from "express";
import {CartItem,AuthenticatedRequest} from '../types/cart.controller.types'
import Cart from "../models/cartModel";
import Product from "../models/productModel";
import { error } from "console";
import mongoose from 'mongoose';



export const addToCart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    let quantity = parseInt(req.body.quantity, 10) || 1;
    const userId = req.user?.id;

    //  Validate Inputs
    if (!productId || !userId) {
      res.status(400).json({ message: "Product ID and User ID are required" });
      return;
    }

    //  Check if Product Exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const MAX_QUANTITY = 10; // Max quantity per product

    //  Find or Create Cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    //  Check if Product is Already in Cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex !== -1) {
      //  Update existing product quantity
      cart.products[productIndex].quantity += quantity;

      //  Ensure max quantity limit
      if (cart.products[productIndex].quantity > MAX_QUANTITY) {
        cart.products[productIndex].quantity = MAX_QUANTITY;
        await cart.save();
        res.status(400).json({ message: `Maximum quantity of ${product.name} reached` });
        return;
      }
    } else {
      //  Add new product to cart
      cart.products.push({ productId, quantity });
    }

    //  Save updated cart
    await cart.save();

    //  Return updated cart
    res.status(200).json({
      message: "Product added to cart successfully",
      cart,
    });

  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "An error occurred while adding to cart" });
  }
};


export const getCart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "User ID is required" });
      return; // Stops execution
    }

    // Find and Return Cart
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return; // Ensures function stops
    }

    // Return Cart Data
    res.status(200).json({ cart });

  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "An error occurred while getting cart" });
  }
};

export const updateProductQuantity = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const productId: string = req.params.id;
    const userId = req.user?.id;
    let quantityChange = parseInt(req.body.quantity, 10);

    if (!productId || !userId || isNaN(quantityChange)) {
      res.status(400).json({ error: "Product ID and valid quantity are required" });
      return;
    }

    //  Check if Product Exists
    const productExist = await Product.findById(productId);
    if (!productExist) {
      res.status(404).json({ error: "Product Not Found!" });
      return;
    }

    //  Find Cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({ error: "Cart Not Found!" });
      return;
    }

    //  Find Product in Cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      res.status(400).json({ error: "Product not found in the cart!" });
      return;
    }

    //  Ensure max quantity limit
    const MAX_QUANTITY = 10;
    cart.products[productIndex].quantity += quantityChange;

    if (cart.products[productIndex].quantity > MAX_QUANTITY) {
      cart.products[productIndex].quantity = MAX_QUANTITY;
    } else if (cart.products[productIndex].quantity < 1) {
      //  If quantity goes below 1, remove product from cart
      cart.products.splice(productIndex, 1);
    }

    //  Save cart after update
    await cart.save();

    res.status(200).json({ message: "Product quantity updated", cart });

  } catch (err: any) {
    console.error("Error updating product quantity:", err);
    res.status(500).json({ error: err.message });
  }
};

export const removeProductFromCart = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const productId: string = req.params.id;
    const userId = req.user?.id;

    //  Check if Product Exists
    const productExist = await Product.findById(productId);
    if (!productExist) {
      res.status(404).json({ error: "Product Not Found!" });
      return;
    }

    //  Find User's Cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({ error: "Cart Not Found!" });
      return;
    }

    //  Find Product in Cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      res.status(400).json({ error: "Product not found in the cart!" });
      return;
    }

    //  Remove Product from Cart
    cart.products.splice(productIndex, 1);
    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });

  } catch (error: any) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: error.message });
  }
};

