const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product = require('./product');
const OneMove = require('./oneMove');

const PromotionSchema = new Schema({
    name: { type: String, required: true},
    listProduct: [ {type: Schema.Types.ObjectId, ref: OneMove} ],
    price: { type: Number, required: true },
    dateHome: { type: Date, default: Date() },
    dateEnd: { type: Date },
    stock: { type: Number },
    enabled: { type: Boolean, default: true }
});


PromotionSchema.methods.addStock = (num) => this.stock += num;
PromotionSchema.methods.removeStock = (num) => this.stock -= num;


module.exports = mongoose.model('Promotion', PromotionSchema);