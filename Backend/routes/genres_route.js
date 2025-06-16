const express = require("express");
const { createGenres, getAllGenres } = require("../controllers/genres_controller");
const {protected} = require("../Middlewares/authMiddlewares")

const router = express.Router();

router.post("/creategenre", protected, createGenres);
router.get("/getallgenres", protected, getAllGenres);

module.exports = router;
