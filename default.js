const Item = require("./models/items.js");

const item1 = new Item({
    name: "Welcome to todo list"
});
const item2 = new Item({
    name: "Use + to add new items"
});
const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];
module.exports = defaultItems;