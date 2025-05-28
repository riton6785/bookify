const express = require("express");
const { addReview, getReviewOfBook } = require("../controllers/review_controller");
const { protected } = require("../Middlewares/authMiddlewares");

const router = express.Router()

router.post("/postreview", protected, addReview);
router.get("/getreviewofbook", protected, getReviewOfBook);

module.exports = router;
