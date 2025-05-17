const mongoose = require("mongoose");

const connectDB = async () => {
    try {   
    const conn = await mongoose.connect("mongodb+srv://sharmaaditya6785:bsYvm3QmNA4mDL7d@cluster0.a9jjlzg.mongodb.net/", {
    });
    console.log(`MongoDb connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error ${error.message}`.red.bold)
        process.exit()
    }
}

module.exports = connectDB