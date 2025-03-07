import { Router } from 'express'
import {createShop, getShopData, updateShop} from '../controller/seller.controller'

export const sellerRoutes = Router();

sellerRoutes.post("/create",createShop);
sellerRoutes.get("/:id",getShopData)
sellerRoutes.patch("/update",updateShop)