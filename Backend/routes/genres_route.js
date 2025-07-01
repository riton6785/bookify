const express = require("express");
const { createGenres, getAllGenres, getGenresCount } = require("../controllers/genres_controller");
const {adminProtected} = require("../Middlewares/authMiddlewares")

const router = express.Router();

router.post("/creategenre", adminProtected, createGenres);
router.get("/getallgenres", adminProtected, getAllGenres);
router.get("/getrecordcount", adminProtected, getGenresCount);

module.exports = router;
