const _ = require("lodash");
const asyncHandler = require('express-async-handler');
const List = require("../models/list.js");

const defaultItems = require("../default.js");

const customList = asyncHandler(async(req,res)=>{
    const customListName = _.capitalize(req.params.customListName);
    await List.findOne({name: customListName},function(err,foundList){
        if(!err){
            if(!foundList){

                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/"+ customListName);
            }else{
                
                res.render("list",{listTitle: foundList.name, nextItem: foundList.items});
            }
        }
    });
})

module.exports ={
    customList
};