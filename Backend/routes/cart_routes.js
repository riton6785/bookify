const express = require("express");

const router = express.Router();
const {addToCart, getCartItems, removeCartItem} = require("../controllers/cart_controller");
const { protected } = require("../Middlewares/authMiddlewares");
const { route } = require("./userRoutes");

router.post("/addtocart", protected, addToCart);
router.get("/getcartitems", protected, getCartItems);
router.post("/removeitem", protected, removeCartItem);

module.exports = router;