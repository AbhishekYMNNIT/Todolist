const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model("Item", itemsSchema);