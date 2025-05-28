const asyncHandler = require("express-async-handler");
const ReviewModel = require("../Model/reviewModel");
const addReview = asyncHandler(async (req, res)=> {
    const {bookId, rating, review} = req.body;

    if(!req.user._id) {
        return res.status(400).json({
            message: "User not found probably login first",
        });
    }
    const reviewRecord = await ReviewModel.create({
        review,
        userId: req.user._id,
        bookId: bookId,
        rating: rating,
    })


    if(reviewRecord) {
        await reviewRecord.populate("userId", "name pic")
        res.status(201).json({
            review: reviewRecord.review,
            userId: reviewRecord.userId,
            bookId: reviewRecord.bookId,
            rating: reviewRecord.rating,
        });
    } else {
        res.status(400).json({
            message: "Failed to add review"
        });
    }
})

const getReviewOfBook = asyncHandler(async(req, res)=> {
    const {bookId} = req.query;
    const reviews = await ReviewModel.find({bookId: bookId}, {__v: 0}).populate("userId", "name pic");

    if(reviews) {
        res.status(200).json({
            reviews: reviews,
        })
    } else {
        res.status(400).json({
            message: "Failed to getreviews",
        })
    }
})

module.exports = {getReviewOfBook, addReview}