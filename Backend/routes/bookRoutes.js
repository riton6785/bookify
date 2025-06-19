const express = require("express");
const { route } = require("./userRoutes");
const { createBookRecord, getAllBooks, bookById, getBooksForHomePage, updateBookRecord } = require("../controllers/bookControllers");
const { adminProtected, protected } = require("../Middlewares/authMiddlewares");

const router = express.Router();

router.post("/addbook", createBookRecord);
router.get("/getallbooks", protected, getAllBooks);
router.get("/bookbyid", protected, bookById);
router.get("/getbooksforhomepage", getBooksForHomePage);

module.exports = router;