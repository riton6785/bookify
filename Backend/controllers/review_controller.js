const asyncHandler = require("express-async-handler");
const ReviewModel = require("../Model/reviewModel");
const addReview = asyncHandler(async (req, res)=> {
    const {bookId, rating} = req.body;

    const review = await ReviewModel.create({
        userId: req.user._id,
        bookId: bookId,
        rating: rating,
    })

    if(!req.user._id) {
        res.status(400).json({
            message: "User not found probably login first",
        });
    }

    if(review) {
        res.status(201).json({
            userId: req.user._id,
            bookId: bookId,
            rating: rating,
        });
    } else {
        res.status(400).json({
            message: "Failed to add review"
        });
    }
})

const getReviewOfBook = asyncHandler(async(req, res)=> {
    const {bookId} = req.body;
    const reviews = await ReviewModel.find({bookId: bookId}).populate("userId", "name pic");

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
