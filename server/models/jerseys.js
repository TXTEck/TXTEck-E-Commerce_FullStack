const mongoose = require(`mongoose`)

let jerseysSchema = new mongoose.Schema(
   {
        team: {type: String},
        player: {type: String},
        number: {type: Number},
        size: {type: String},
        price: {type: Number},
        colour: {type: String},
        jerseyPictureFilename :{type:String, default:""}
   },
   {
       collection: `jerseys`
   })

module.exports = mongoose.model(`jerseys`, jerseysSchema)