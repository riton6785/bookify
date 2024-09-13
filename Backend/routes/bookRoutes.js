const express = require("express");
const { route } = require("./userRoutes");
const { createBookRecord, getAllBooks, bookById } = require("../controllers/bookControllers");
const { adminProtected, protected } = require("../Middlewares/authMiddlewares");

const router = express.Router();

router.post("/addbook", createBookRecord);
router.get("/getallbooks", adminProtected, getAllBooks);
router.get("/bookbyid", protected, bookById);

module.exports = router;