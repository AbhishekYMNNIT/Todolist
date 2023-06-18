const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const _ = require("lodash");
const Item=require("./models/items.js")
const List = require("./models/list.js")

const connectDB=require('./config/conn.js');
connectDB();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const port = process.env.PORT || 3000;


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


app.get("/",function(req,res){
    
    Item.find({},function(err,foundItems){

        if(foundItems.length === 0){
            Item.insertMany(defaultItems,function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Successfully saved items to DB");
                }
            });
            res.redirect("/");
        }
        else
        res.render("list",{listTitle: "Today", nextItem: foundItems});
    });
    
});
app.post("/",function(req,res){
    
    const ItemName = req.body.newItem;
    const listName = req.body.list;
    
    const newItem = new Item({
        name: ItemName
    });
    if(listName === "Today"){
    newItem.save();
    res.redirect("/");
    }else{
        List.findOne({name: listName},function(err,foundList){
            foundList.items.push(newItem);
            foundList.save();
            res.redirect("/" + listName);
        });
        
    }
    
});

app.post("/delete",function(req,res){
    const checkedItemId = req.body.checkbox;
    const customListName = req.body.listName;
    

    if(customListName === "Today"){
        Item.findByIdAndRemove(checkedItemId,function(err){
            if(!err){
                console.log("SUCCESS");
                res.redirect("/");
            }  
        });
    }else{
        List.findOneAndUpdate({name: customListName},{$pull:{items:{_id: checkedItemId}}},function(err,foundList){
            if(!err){
                res.redirect("/" + customListName);
            }
        });
    }
    
    
});

app.get("/:customListName", function(req,res){
    const customListName = _.capitalize(req.params.customListName);
    List.findOne({name: customListName},function(err,foundList){
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
    
});

app.listen(port,()=>{
    console.log("Listening to port = "+port);
});
