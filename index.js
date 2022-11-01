const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
//fake post to patch, delete method
const methodOverride = require('method-override');
//import product model from product.js
const Product = require('./model/product')
//set Mongoose Environment
const mongoose = require('mongoose');

const categories = ['fruit', 'vegetable', 'dairy']
//connect to Mongoose, create new db: farmStand
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('Mongo Connect Success')
    })
    .catch((e) => {
        console.log('Mongo Connect ERROR');
        console.log(e)
    })

//set ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
//set Bootstrap style
app.use(express.static(path.join(__dirname, 'public')));
//parse data with urlencoded and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//fake post to patch, delete method
app.use(methodOverride('_method'));


//get home page
app.get('/', (req, res) => {
    res.render("home.ejs", { title: 'Home Page' })
})
//get products page
app.get('/products', async (req, res) => {
    const { category } = req.query;
    console.log(category)
    if (category) {
        const products = await Product.find({ category: category })
        const Cname = category[0].toUpperCase() + category.slice(1)
        res.render('./project/index.ejs', { title: 'products', products, category: Cname })
    } else {
        const products = await Product.find({});
        res.render('./project/index.ejs', { title: 'products', products, category: 'All' })
    }
})
//get new product page
app.get('/products/new', (req, res) => {
    res.render('./project/new.ejs', { title: "Add New Products" })
})
//post new product
app.post('/products', async (req, res) => {
    try {
        const newP = new Product(req.body);
        await newP.save();
        res.redirect('/products')
    }
    catch (e) {
        res.render('./project/newError.ejs', { title: "Add New Products" });
        console.log(e)
    }
})

//get show page
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const p = await Product.findById(id);
        res.render('./project/show.ejs', { title: p.name, p })
    }
    catch (e) {
        console.log(e)
        res.render("./project/index.ejs");
    }
})
//get edit page
app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const p = await Product.findById(id);
    res.render('./project/edit.ejs', { title: p.name, p, categories })
})
//PATCH Update edit
app.patch("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = {
            name: req.body.pName,
            price: req.body.pPrice,
            category: req.body.pCategory,
            description: req.body.pDescription,
            img: req.body.pImg
        };
        const product = await Product.findByIdAndUpdate(id, updatedProduct, { runValidators: true, new: true });
        res.redirect(`/products/${product._id}`)
    }
    catch (e) {
        const p = await Product.findById(id);
        res.render(`project/editError.ejs`, { title: p.name, p })
    }

})
//Delete
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

