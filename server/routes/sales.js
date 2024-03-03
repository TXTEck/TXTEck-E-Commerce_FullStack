const router = require('express').Router();
const salesModel = require('../models/sales');
const jerseysModel = require('../models/jerseys'); 


const createNewSaleDocument = (req, res, next) => {
    let saleDetails = {
        customerName: req.body.customerName,
        paypalPaymentID: req.body.paypalPaymentID,
        price: req.body.price,
        items: req.body.items, 
        purchaseDate: new Date() 
    };

    // Create sale
    salesModel.create(saleDetails, (err, data) => {
        if (err) return next(err);
        return res.json({ success: true, data: data });
    });
};

// Save a record of each PayPal payment
router.post('/sales', createNewSaleDocument);

module.exports = router;
