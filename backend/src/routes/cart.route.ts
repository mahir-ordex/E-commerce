import { Router } from "express";
import {
  addToCart,
  getCart,
  updateProductQuantity,
  removeProductFromCart,
} from "../controller/cart.controller";
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware";

export const cartRoutes = Router();

//  Protect all cart routes
cartRoutes.use(authenticateUser);
cartRoutes.use(authorizeUser(["customer"]));

//  Get the user's cart
cartRoutes.get("/cart", getCart);

//  Add, Update, or Remove a product from the cart
cartRoutes
  .route("/:id")
  .post(addToCart) // Add a product to cart
  .patch(updateProductQuantity) // Update quantity
  .delete(removeProductFromCart); // Remove a product

