const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product = require('./product');
const Promotion = require('./promotion');
const Move = require('./move');

const OneMoveSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: Product || Schema.Types.ObjectId, ref: Promotion },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    amount: { type: Number },
    father: { type: Schema.Types.ObjectId, ref: Move || Schema.Types.ObjectId, ref: Promotion }
});


module.exports = mongoose.model('OneMove', OneMoveSchema);