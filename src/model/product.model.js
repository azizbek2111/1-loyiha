const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {  
        type: String,
        required: true

    },
    oldprice: {
        type: Number,
        required: false 
    },
    action: {
        type: Array,
        required: false
    },
    quantity: {
        type: Number,
        required: true  
    },
    boxQuantity: {
        type: Number,
        required: false
    },
    quality: {
        type: String,
        required: false
    },  
    brand:{
        type: String,
        required: false
    },
    category: {
        type: String,
        enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Beauty', 'Sports'],
        required: true
    },
    images: {
        type: [String],
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
        required: true
    },
    comments: {
        type: [
            {       
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User' 
                },
                commentText: {
                    type: String,
                    required: true
                },  
                createdAt: {
                    type: Date,
                    default: Date.now   
                },
                reason: {
                    type: String,
                    required: false
                },
                likes: {
                    type: Number,
                    default: 0
                },
            }   
        ],
        default: []
    },   


});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;