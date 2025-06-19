const asyncHandler = require("express-async-handler");
const SoldProducts = require("../Model/sold_products");
const Book = require("../Model/bookModel");

const createSoldProduct = asyncHandler((async(productAndQuantities, totalAmount, userId)=> {
    await SoldProducts.create({
        userId,
        productwithquantity: productAndQuantities,
        totalAmount,
    })
    for(product of productAndQuantities){
        await Book.findByIdAndUpdate(
            product.product_id,
            { $inc: { stock: -product.quantity } },
            { new: true, runValidators: true }
        );
    }
}))

module.exports = {createSoldProduct};
