const mongoose = require("mongoose");

const GenresSchema = mongoose.Schema({
    name: {type: String, required: true},
    book_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
        }
    ]
})

const Genres = mongoose.model("genres", GenresSchema);

module.exports = Genres;
