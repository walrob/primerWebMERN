const express = require('express');
const router = express.Router();

const Product = require('../models/product');


router.get('/', async (req, res) => {
    const product = await Product.find();
    console.log(product);
    res.json(product);
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

router.post('/', async (req, res) => {
    const { name, make, code, stock, price } = req.body;
    const product = new Product({name, make, code, stock, price});
    await product.save();
    res.json({ status: 'Product Saved' });
});

router.put('/:id', async (req, res) => {
    const { name, make, code, stock, price } = req.body;
    const newProduct = { name, make, code, stock, price };
    await Product.findByIdAndUpdate(req.params.id, newProduct);
    res.json({ status: 'Product Updated'});
});

router.get('/search/:name', async (req, res) => {
    //const product = await Product.find({name: req.params.name});

    //Busqueda exacta en el index, ignora tildes y may/min
    //const product = await Product.find({ $text: { $search: req.params.name }});

    //Busqueda en NAME de un string parcial, sensible a tildes y may/min
    const product = await Product.find({ name: { $regex: new RegExp(req.params.name) }});
    res.json(product);
});

router.get('/search/:name/:bool', async (req, res) => {
    const product = await Product.find({ name: { $regex: new RegExp(req.params.name)} , enabled: req.params.bool});
    res.json(product);
});

router.get('/enabled/:bool', async (req, res) => {
    const product = await Product.find({enabled: req.params.bool});
    res.json(product);
});

router.delete('/:id/:bool', async (req, res) => {
    //await Product.findByIdAndRemove(req.params.id);
    const product = await Product.findById(req.params.id);
    product.enabled = req.params.bool;
    await product.save();
    if (req.params.bool === 'true') {
        res.json({ status: 'Product Added'});
    } else {
        res.json({ status: 'Product Deleted'});
    }
});

router.get('/report/:num', async(req,res) => {
    const product = await Product.find({
        stock: { $lt: req.params.num }
    });
    res.json(product);
});

module.exports = router;