const express = require("express");
const { route } = require("./userRoutes");
const { createBookRecord, getAllBooks } = require("../controllers/bookControllers");

const router = express.Router();

router.post("/addbook", createBookRecord);
router.get("/getallbooks", getAllBooks)

module.exports = router;