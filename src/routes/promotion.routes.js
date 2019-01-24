const express = require('express');
const router = express.Router();

const Promotion = require('../models/promotion');


router.get('/', async (req, res) => {
    const promotion = await Promotion.find();
    console.log(promotion);
    res.json(promotion);
});

router.get('/:id', async (req, res) => {
    const promotion = await Promotion.findById(req.params.id);
    res.json(promotion);
});

router.post('/', async (req, res) => {
    const { name, listProduct, price, dateHome, dateEnd, stock } = req.body;
    const promotion = new Promotion({name, listProduct, price, dateHome, dateEnd, stock});
    await promotion.save();
    //res.json({ status: 'Promotion Saved' });
    res.json(promotion);
});

router.put('/:id', async (req, res) => {
    const { name, listProduct, price, dateHome, dateEnd, stock } = req.body;
    const newPromotion = { name, listProduct, price, dateHome, dateEnd, stock };
    await Promotion.findByIdAndUpdate(req.params.id, newPromotion);
    res.json({ status: 'Promotion Updated'});
});

router.get('/enabled/:bool', async (req, res) => {
    const promotion = await Promotion.find({enabled: req.params.bool});
    res.json(promotion);
});

router.delete('/:id/:bool', async (req, res) => {
    const promotion = await Promotion.findById(req.params.id);
    promotion.enabled = req.params.bool;
    await promotion.save();
    if (req.params.bool === 'true') {
        res.json({ status: 'Promotion Added'});
    } else {
        res.json({ status: 'Promotion Deleted'});
    }
});

router.get('/search/:name', async (req, res) => {
    const promotion = await Promotion.find({ name: { $regex: new RegExp(req.params.name) }});
    res.json(promotion);
});

router.get('/search/:name/:bool', async (req, res) => {
    const promotion = await Promotion.find({ name: { $regex: new RegExp(req.params.name)} , enabled: req.params.bool});
    res.json(promotion);
});

module.exports = router;