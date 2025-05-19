const asyncHandler = require("express-async-handler");

const User = require("../Model/usermodel");
const Cart = require("../Model/cart_model");
const Book = require("../Model/bookModel");

const addToCart = asyncHandler(async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
        return
    }
    const cartItem = await Cart.findOne({user: userId});
    if (cartItem) {
        const existingProduct = cartItem.product.find(item => item.product.toString() === bookId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cartItem.product.push({ product: bookId, quantity: 1 });
        }
        await cartItem.save();
    } else {
        const newCart = new Cart({
            user: userId,
            product: [{ product: bookId, quantity: 1 }],
        });
        await newCart.save();
    }
    
})

const getCartItems = asyncHandler (async(req, res) => {
    const userId = req.user._id;

    const cartItems = await Cart.findOne({user: userId})
    .populate("product.product", "name pic price");

    if(cartItems) {
        res.status(200).json(cartItems.product);
    } else {
        return res.status(404).json({message: "No cart items found"});
    }
})

const removeCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;

    const cartItem = await Cart.findOne({user: userId});
    if (cartItem) {
        const item = cartItem.product.find((item)=> item.product.toString() === productId);
        if (!item) {
            return res.status(404).json({message: "Item not found in cart"});
        }
        if (item.quantity > 1) {
            item.quantity -= 1;
            await cartItem.save();
            return res.status(200).json({message: "Item quantity updated"});
        } else {
            cartItem.product.pull(item);
            await cartItem.save();
            return res.status(200).json({message: "Item removed from cart"});
        }
    }
    if (cartItem.product.length === 0) {
        await Cart.deleteOne({user: userId});
        return res.status(200).json({message: "Cart is empty"});
    }
})

module.exports = {addToCart, getCartItems, removeCartItem};