const express = require("express");
const dotenv = require("dotenv")
const connectDB = require("./Config/db");
var colors = require('colors')
const cors = require("cors");

const userRoutes = require('./routes/userRoutes')
const bookRoutes = require('./routes/bookRoutes')

dotenv.config()
connectDB()
const app = express();
app.use(cors())
app.use(express.json())

app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.get("/",(req,res)=>{
    res.send("<h1>welcome here</h1>")
})
app.listen(2000, ()=>{
    console.log("server is listening at port 2000")
})

