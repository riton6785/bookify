const asyncHandler = require("express-async-handler");
const Book = require("../Model/bookModel");
const { setBooksintotheGenres } = require("./genres_controller");
const Genres = require("../Model/genres_model");

const createBookRecord = asyncHandler(async (req, res)=>{
    const {name, price, author, description, stock, publisher, pic, isPublished, userId, genres_ids} = req.body;
    const isBookExists = await Book.findOne({name});
    if(isBookExists) {
        throw new Error("Already exists");
        return
    }
    const book = await Book.create({name, price, author, description, stock, publisher, pic, isPublished, createdBy: userId, genres_ids});
    if(book) {
        setBooksintotheGenres(genres_ids, book._id);
        res.status(200).send({
            _id: book._id,
            name: name,
            price: price,
            author: author,
            description: description,
            stock: stock,
            publisher: publisher,
            pic: pic,
            isPublished: isPublished,
            createdBy: userId
        })
    }

})

const getAllBooks = asyncHandler(async(req, res)=>{
    const allBooks = await Book.find({}).populate('genres_ids', 'name');
    res.send(allBooks)
})

const getBooksForHomePage = asyncHandler(async(req
    , res) => {
    const books = await Book.find({isPublished: true}, { stock: 0, isPublished: 0, __v: 0, updatedAt: 0, createdAt: 0 }).limit(12);
    res.send(books)
})

const getBooksSearchResult = asyncHandler(async(req, res)=> {
    const {queryString} = req.query;
    console.log(queryString);
    // Find method using the regex oprtaor because direct find willdo the exact match 
    const getGenresId = await Genres.find(
        { name: { $regex: queryString, $options: 'i' } }, // contains
        { _id: 1 }
    );
    const books = await Book.find({
        $or: [
            { name: { $regex: queryString, $options: 'i' } },
            { author: { $regex: queryString, $options: 'i' } },
            { description: { $regex: queryString, $options: 'i' } },
            { genres_ids: { $in: getGenresId } },
        ]
    }, { stock: 0, isPublished: 0, __v: 0, updatedAt: 0, createdAt: 0 });
    res.send(books);
})

const bookById = asyncHandler(async(req, res) => {
    const book = await Book.findById(req.query.id).populate('genres_ids', 'name');
    res.send(book)
})

const updateBookRecord = asyncHandler(async(req, res)=> {
    const {changedFields} = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, changedFields);
})

const getProductsCount = asyncHandler(async(req, res)=> {
    const data = await Book.countDocuments();
    res.send(data);
})

module.exports = {createBookRecord, getAllBooks, bookById, getBooksForHomePage, updateBookRecord, getProductsCount, getBooksSearchResult}