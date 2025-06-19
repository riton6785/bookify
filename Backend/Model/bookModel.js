const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number},
    author: {type: String},
    rating: {type: Number},
    description: {type: String},
    stock: {type: Number, min: 0}, //here min attribute will be only from mongoose while cfreating or saving record it will not applied on the databse level measn we can modify this directly using shell or query. 
    publisher: {type: String},
    isPublished: { type: Boolean, enum: [true, false], default: false },
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    genres_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "genres",
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

}, {
    timestamps: true,
})

const Book = mongoose.model("book", bookSchema);

module.exports = Book
