const express = require('express');
import { connectDB } from "./utils/dbconnection"; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";

//importing all route
import userRoutes from './routes/user.route';
import categoryRoutes from "./routes/category.route";
import productRoutes from './routes/product.route';
import { cartRoutes } from "./routes/cart.route";
import { sellerRoutes } from "./routes/seller.route";

dotenv.config();
const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
));  
app.use(cookieParser());
app.use(express.json());

// using routes

app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use("/api/seller",sellerRoutes)
app.use('/api',categoryRoutes);
app.use('/api/cart',cartRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});
