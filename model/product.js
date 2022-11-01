//set Mongoose Environment
const mongoose = require('mongoose');
//don't need to connect mongoose here, because products.js will be required in index.js, and index.js connect to Mongoose
//set Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['fruit', 'vegetable', 'dairy'],
        lowercase: true,
        required: true
    },
    img: {
        type: String
    },
    description: {
        type: String
    }
})

//compile model to Mongo
const Product = mongoose.model('Product', productSchema)

//export to index.js
module.exports = Product;