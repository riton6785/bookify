const mongoose = require("mongoose");

const SaleOrderSchema = mongoose.Schema({
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

const SaleOrder = mongoose.model('sale_order', SaleOrderSchema);

module.exports = SaleOrder;
