import mongoose from "mongoose";

export function connectDB() { // ✅ No redeclaration
    if (process.env.DB_URL) {
        mongoose.connect(process.env.DB_URL)
            .then(() => console.log("Connected to MongoDB"))
            .catch((err) => console.log(err.message));
    } else {
        console.error("DB_URL is not defined");
    }
}
