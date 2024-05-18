const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        min: 0,
        required: true,
        type: Number,
    },
    category: {
        type: String,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;