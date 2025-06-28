const express = require("express");
const { createGenres, getAllGenres } = require("../controllers/genres_controller");
const {protected, adminProtected} = require("../Middlewares/authMiddlewares")

const router = express.Router();

router.post("/creategenre", adminProtected, createGenres);
router.get("/getallgenres", adminProtected, getAllGenres);

module.exports = router;
