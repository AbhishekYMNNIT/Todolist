const mongoose = require("mongoose");
const itemsSchema=require("./items.js").schema;

const listSchema = new mongoose.Schema({
    name: String,
    items:[itemsSchema]
});

module.exports = mongoose.model("List",listSchema);
