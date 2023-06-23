const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');

const connectDB=require('./config/conn.js');
connectDB();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(express.static("public"));
app.use(express.json());

const port = process.env.PORT || 3000;

const errorHandler = require('./middleware/errorHandler.js');
const itemRoute= require("./routes/itemRoutes.js")
const customRoutes = require("./routes/customRoutes.js")
app.use(itemRoute);
app.use(customRoutes);


app.use(errorHandler);
app.listen(port,()=>{
    console.log("Listening to port = "+port);
});
