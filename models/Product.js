const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['indoor', 'outdoor', 'decorative']
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    isOnSale: {
        type: Boolean,
        default: false
    },
    salePrice: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema); 