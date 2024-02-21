const mongoose = require(`mongoose`)

let carsSchema = new mongoose.Schema(
   {
        model: {type: String},
        colour: {type: String},
        year: {type: Number},
        price: {type: Number},
        sold: {type: Boolean, default:false}
   },
   {
       collection: `cars`
   })

module.exports = mongoose.model(`cars`, carsSchema)