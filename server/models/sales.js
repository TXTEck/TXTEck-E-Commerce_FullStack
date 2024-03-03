const mongoose = require('mongoose');

let salesSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    paypalPaymentID: { type: String, required: true },
    price: { type: Number, required: true },
    items: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'jerseys' }, 
        player: String,
        price: Number,
        quantity: Number,
        size: String 
    }],
    purchaseDate: { type: Date, default: Date.now } 
},
{
    collection: 'sales'
});

module.exports = mongoose.model('sales', salesSchema);
