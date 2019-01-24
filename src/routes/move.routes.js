const express = require('express');
const router = express.Router();

const Move = require('../models/move');
const Person = require('../models/person');
//const Promotion = require('../models/move');


router.get('/', async (req, res) => {
    const move = await Move.find();
    console.log(move);
    res.json(move);
});

router.get('/:id', async (req, res) => {
    const move = await Move.findById(req.params.id);
    res.json(move);
});

router.post('/', async (req, res) => {
    const { listProduct, date, person, type } = req.body;
    const move = new Move({listProduct, date, person, type});
    await move.save();
    console.log('Move Saved');
    res.json(move);
});

router.put('/:id', async (req, res) => {
    const { listProduct, date, person, type } = req.body;
    const newMove = { listProduct, date, person, type };
    await Move.findByIdAndUpdate(req.params.id, newMove);
    res.json({ status: 'Move Updated'});
});

router.delete('/:id', async (req, res) => {
    await Move.findByIdAndRemove(req.params.id);
    res.json({ status: 'Move Deleted'});
});

router.get('/type/:name', async (req, res) => {
    console.log('entro al move 1')
    const move = await Move.find({
        type: req.params.name
    });
    res.json(move);
});

router.get('/:dateHome/:dateEnd', async(req,res) => {
    const move = await Move.find({
        date: { $gt: req.params.dateHome, $lt: req.params.dateEnd }
    });
    res.json(move);
});

router.get('/type/person/:id', async (req, res) => {
    const person = await Person.findById(req.params.id).name;
    res.json(person);
});

router.get('/type/:name/:dateHome/:dateEnd', async (req, res) => {
    const move = await Move.find({
        type: req.params.name,
        date: { $gt: req.params.dateHome, $lt: req.params.dateEnd }
    });
    res.json(move);
});



/*
Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).
  sort({ occupation: -1 }).
  select({ name: 1, occupation: 1 }).
  exec(callback);
*/

module.exports = router;