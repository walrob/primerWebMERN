const mongoose = require('mongoose');
const { Schema } = mongoose;

const Person = require('./person');
const OneMove = require('./oneMove');

const MoveSchema = new Schema({
    listProduct: [ {type: Schema.Types.ObjectId, ref: OneMove} ],
    date: { type: Date, default: Date() },
    person: { type: Schema.Types.ObjectId, ref: Person, default: null },
    type: [ 'Sale' , 'Buy' ]
});


module.exports = mongoose.model('Move', MoveSchema);
//module.exports = mongoose.model('OneMove', OneMoveSchema);