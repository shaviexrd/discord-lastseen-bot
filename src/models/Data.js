const mongoose = require("mongoose")

const lastseen = new mongoose.Schema({
    userID: { type: String },
    time: { type: String},
})

module.exports = mongoose.model("lastseen", lastseen)