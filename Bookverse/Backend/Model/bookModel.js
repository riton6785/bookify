const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number},
    description: {type: String},
    stock: {type: Number},
    publisher: {type: String},
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

}, {
    timestamps: true,
})

const Book = mongoose.model("book", bookSchema);

module.exports = Book
