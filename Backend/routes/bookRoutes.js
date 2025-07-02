const express = require("express");
const { route } = require("./userRoutes");
const { createBookRecord, getAllBooks, bookById, getBooksForHomePage, updateBookRecord, getProductsCount, getBooksSearchResult } = require("../controllers/bookControllers");
const { adminProtected, protected } = require("../Middlewares/authMiddlewares");

const router = express.Router();

router.post("/addbook", adminProtected, createBookRecord);
router.get("/getallbooks", protected, getAllBooks);
router.get("/bookbyid", protected, bookById);
router.get("/getbooksforhomepage", getBooksForHomePage);
router.put("/updatebook/:id", adminProtected, updateBookRecord);
router.get("/getrecordcount", adminProtected, getProductsCount);
router.get("/search/getbook", getBooksSearchResult);
module.exports = router;