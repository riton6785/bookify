const asyncHandler = require("express-async-handler");
const SaleOrder = require("../Model/sale_order");
const Book = require("../Model/bookModel");

const createSaleOrder = asyncHandler((async(productAndQuantities, totalAmount, userId)=> {
    await SaleOrder.create({
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

module.exports = {createSaleOrder};
