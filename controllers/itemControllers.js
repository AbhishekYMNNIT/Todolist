const asyncHandler = require('express-async-handler');
const Item = require("../models/items.js");
const List = require("../models/list.js");

const defaultItems = require("../default.js");

const getItems = asyncHandler(async (req, res) => {
    const foundItems = await Item.find({});
    // Initialize
    if (foundItems.length === 0) {
        Item.insertMany(defaultItems, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully saved items to DB");
            }
        });
        res.redirect("/");
    }
    else
        res.render("list", { listTitle: "Today", nextItem: foundItems });

});


const postItems = asyncHandler(async (req, res) => {

    let ItemName = req.body.newItem;
    let listName = req.body.list;

    const newItem = new Item({
        name: ItemName
    });

    if (listName === "Today") {
        await newItem.save();
        res.redirect("/");
    }
    else {
        await List.findOne({ name: listName }, function (err, foundList) {
            foundList.items.push(newItem);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
});

const deleteItems = asyncHandler(async (req, res) => {
    const checkedItemId = req.body.checkbox;
    const customListName = req.body.listName;

    if (customListName === "Today") {
        await Item.findOneAndRemove({ _id: checkedItemId }, async (err)=> {
            if (!err)
                res.redirect("/");
        })
    }
    else {
        await List.findOneAndUpdate({ name: customListName }, { $pull: { items: { _id: checkedItemId } } }, function (err, foundList) {
            if (!err)
                res.redirect("/" + customListName);
        });
    }
});

module.exports = {
    getItems,
    postItems,
    deleteItems
};
