import { Router } from 'express'
import {createShop, getShopData, updateShop} from '../controller/seller.controller'
import {authenticateUser} from '../middleware/auth.middleware'

export const sellerRoutes = Router();

sellerRoutes.use(authenticateUser)

sellerRoutes.post("/create",createShop);
sellerRoutes.get("/:id",getShopData)
sellerRoutes.patch("/update",updateShop)