import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:[{
        type: String,
        required: true
    }],
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    shopId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    }
},{timestamps:true})

const Product = mongoose.model('Product', ProductSchema);

export default Product;