const express = require('express');
const router = express.Router();

const OneMove = require('../models/oneMove');


router.get('/', async (req, res) => {
    const oneMove = await OneMove.find();
    console.log(oneMove);
    res.json(oneMove);
});

router.get('/:id', async (req, res) => {
    const oneMove = await OneMove.findById(req.params.id);
    res.json(oneMove);
});

router.post('/', async (req, res) => {
    const { product, name, quantity, amount, father } = req.body;
    const oneMove = new OneMove({product, name, quantity, amount, father});
    await oneMove.save();
    res.json({ status: 'OneMove Saved' });
});

router.put('/:id', async (req, res) => {
    const { product, name, quantity, amount, father } = req.body;
    const newMove = { product, name, quantity, amount, father };
    await OneMove.findByIdAndUpdate(req.params.id, newMove);
    res.json({ status: 'OneMove Updated'});
});

router.delete('/:id', async (req, res) => {
    await OneMove.findByIdAndRemove(req.params.id);
    res.json({ status: 'OneMove Deleted'});
});

router.get('/father/:id', async (req, res) => {
    const oneMove = await OneMove.find({father: req.params.id});
    console.log('buscando....');
    res.json(oneMove);
});



module.exports = router;