const mongoose = require("mongoose");

const SoldProductsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    productwithquantity: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "book",
            },
            quantity: {type: Number}
        }
    ],
    totalAmount: {type: Number},
    date: {type: String},
})

const SoldProducts = mongoose.model('sold_product', SoldProductsSchema);

module.exports = SoldProducts;
