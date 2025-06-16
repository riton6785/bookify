const express = require("express");
const dotenv = require("dotenv")
const connectDB = require("./Config/db");
var colors = require('colors')
const cors = require("cors");

const userRoutes = require('./routes/userRoutes')
const bookRoutes = require('./routes/bookRoutes')
const cartRoutes = require('./routes/cart_routes');
const reviewRoutes = require('./routes/review_routes')
const otpRoutes = require('./routes/otp_routes');
const paymentRoutes = require('./routes/razorpay_route');
const genresRoutes = require('./routes/genres_route')

dotenv.config()
connectDB()
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/genres', genresRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>welcome here</h1>")
})
app.listen(2000, ()=>{
    console.log("server is listening at port 2000")
})

