const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        unique: true,
    },
    product: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "book",
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1,
            },
        },
    ],
}, {
    timestamps: true, 
})

const Cart = mongoose.model("cart", CartSchema);

module.exports = Cart;