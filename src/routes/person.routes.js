const express = require('express');
const router = express.Router();

const Person = require('../models/person');


router.get('/', async (req, res) => {
    const person = await Person.find();
    console.log(person);
    res.json(person);
});

router.get('/:id', async (req, res) => {
    const person = await Person.findById(req.params.id);
    res.json(person);
});

router.get('/type/:name', async (req, res) => {
    const person = await Person.find({type: req.params.name});
    res.json(person);
});

router.post('/', async (req, res) => {
    const { firstname, lastname, dni, address, phone, type } = req.body;
    const person = new Person({firstname, lastname, dni, address, phone, type});
    await person.save();
    res.json({ status: 'Person Saved' });
});

router.put('/:id', async (req, res) => {
    const { firstname, lastname, dni, address, phone, type } = req.body;
    const newProduct = { firstname, lastname, dni, address, phone, type };
    await Person.findByIdAndUpdate(req.params.id, newProduct);
    res.json({ status: 'Person Updated'});
});

router.delete('/:id', async (req, res) => {
    //await Person.findByIdAndRemove(req.params.id);
    const person = await Person.findById(req.params.id);
    person.enabled = false;
    await person.save();
    res.json({ status: 'Person Deleted'});
});



module.exports = router;