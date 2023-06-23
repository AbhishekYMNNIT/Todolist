
require('dotenv').config()
const mongoose = require("mongoose");
const connectDB= async ()=>{
    try{
        const connect= await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        })
        .then(() => {
            console.log("MongoDB Connected...");                   
        })
    }
    catch(err){
        console.log(err);
    }
};
mongoose.set('strictQuery', false);

module.exports= connectDB;

