const mongoose = require('mongoose');
const { Schema } = mongoose;


const PersonSchema = new Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    dni: { type: String, required: true},
    address: { type: String},
    phone: { type: Number},
    type: [ 'Client' , 'Provider' ],
    enabled: { type: Boolean, default: true }
});


PersonSchema.methods.name = () => this.firstname + ' ' + this.lastname;

PersonSchema.index({firstname: 'text', lastname: 'text', dni: 'text'});

module.exports = mongoose.model('Person', PersonSchema);