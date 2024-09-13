const asyncHandler = require("express-async-handler");
const Book = require("../Model/bookModel");

const createBookRecord = asyncHandler(async (req, res)=>{
    const {name, price, author, description, stock, publisher, pic, isPublished} = req.body;
    const isBookExists = await Book.findOne({name});
    if(isBookExists) {
        throw new Error("Already exists");
        return
    }
    const book = await Book.create({name, price, author, description, stock, publisher, pic, isPublished});
    if(book) {
        res.status(200).send({
            name: name,
            price: price,
            author: author,
            description: description,
            stock: stock,
            publisher: publisher,
            pic: pic,
            isPublished: isPublished,
        })
    }

})

const getAllBooks = asyncHandler(async(req, res)=>{
    const allBooks = await Book.find({});
    res.send(allBooks)
})

const bookById = asyncHandler(async(req, res) => {
    const book = await Book.findById(req.query.id)
    res.send(book)
})
module.exports = {createBookRecord, getAllBooks, bookById}