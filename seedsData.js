//import product model from product.js
const Product = require('./model/product')
//set Mongoose Environment
const mongoose = require('mongoose');
//connect to Mongoose
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('Mongoose Connect Success')
    })
    .catch((e) => {
        console.log('Mongoose Connect ERROR');
        console.log(e)
    })

// //add data
// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// //save to MongoDB
// p.save()
//     .then(p => { console.log(p) })
//     .catch(e => { console.log(e) })

// use insertMany to add more products at once
const seedProduct = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable',
        img: 'https://images.unsplash.com/photo-1604245437608-50c6bb8d4ee5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit',
        img: 'https://images.unsplash.com/photo-1563288525-8f1ee0f874a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit',
        img: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable',
        img: 'https://images.unsplash.com/photo-1580391564590-aeca65c5e2d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy',
        img: 'https://images.unsplash.com/photo-1553909489-ec2175ef3f52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwbWlsa3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    }
    // if any data doesn't pass validation, nothing will be inserted.
];
Product.insertMany(seedProduct)
    .then(d => {
        console.log(d)
    })
    .catch(e => {
        console.log(e)
    })