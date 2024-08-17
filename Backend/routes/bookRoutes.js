const express = require("express");
const { route } = require("./userRoutes");
const { createBookRecord, getAllBooks } = require("../controllers/bookControllers");
const { adminProtected } = require("../Middlewares/authMiddlewares");

const router = express.Router();

router.post("/addbook", createBookRecord);
router.get("/getallbooks", adminProtected, getAllBooks);

module.exports = router;