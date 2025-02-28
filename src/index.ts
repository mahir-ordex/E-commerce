const express = require('express');
import { connectDB } from "./utils/dbconnection"; 
const dotenv = require("dotenv");

dotenv.config();

console.log("DB_URL:", process.env.DB_URL);
console.log("PORT:", process.env.PORT);

const app = express();
app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});
