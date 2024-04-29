const asyncHandler = require("express-async-handler");
const Book = require("../Model/bookModel");

const createBookRecord = asyncHandler(async (req, res)=>{
    const {name, price, description, stock, publisher, pic} = req.body;
    const isBookExists = await Book.findOne({name});
    if(isBookExists) {
        throw new Error("Already exists");
        return
    }
    const book = await Book.create({name, price, description, stock, publisher, pic});
    if(book) {
        res.status(200).send({
            name: name,
            price: price,
            description: description,
            stock: stock,
            publisher: publisher,
            pic: pic,
        })
    }

})

const getAllBooks = asyncHandler(async(req, res)=>{
    const allBooks = await Book.find({});
    res.send({allBooks})
})

module.exports = {createBookRecord, getAllBooks}