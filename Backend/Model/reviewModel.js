const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }
})

const ReviewModel = mongoose.model("review", ReviewSchema);
module.exports = ReviewModel;
