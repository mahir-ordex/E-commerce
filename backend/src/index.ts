const express = require('express');
import { connectDB } from "./utils/dbconnection"; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";

//importing all route
import userRouter from './routes/user.route';
import categoryRouter from "./routes/category.route";
import productRouter from './routes/product.route';
import Seller from "./models/sellerModel";
import User from "./models/userModel";
// import cartRouter from './routes/cart.route';
// import sellerRouter from './routes/seller.route';
// import categoryRouter from './routes/category.route';

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

app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api',categoryRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});
