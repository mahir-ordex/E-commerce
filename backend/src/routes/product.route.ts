import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct,} from "../controller/product.controller";
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware";

const productRoutes = Router();

productRoutes.use(authenticateUser);
productRoutes
.route("/")
.get(getAllProducts); // Get all products (accessible to all authenticated users)
productRoutes
  .route("/:id")
  .get(getProductById) // Get a product by ID
  .patch(authorizeUser(["seller"]), updateProduct) // Update a product (only for sellers)
  .delete(authorizeUser(["seller"]), deleteProduct); // Delete a product (only for sellers)
productRoutes.post("/create", authorizeUser(["seller"]), createProduct); //Create or Add a product (only for seller)

export default productRoutes;
