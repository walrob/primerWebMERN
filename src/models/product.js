const mongoose = require('mongoose');
const { Schema } = mongoose;


const ProductSchema = new Schema({
    name: { type: String, required: true},
    make: { type: String, required: true},
    code: { type: String, required: true},
    stock: { type: Number, default: 0},
    price: { type: Number, required: true},
    enabled: { type: Boolean, default: true }
});

ProductSchema.methods.addStock = (num) => this.stock += num;
ProductSchema.methods.removeStock = (num) => this.stock -= num;
ProductSchema.methods.modifyPrice = (price) => this.price = price;

ProductSchema.index({name: 'text', make: 'text', code: 'text'});
//ProductSchema.index({name: 'text', make: 'text'});

module.exports = mongoose.model('Product', ProductSchema);