const asyncHandler = require(   "express-async-handler");
const razorpayInstance = require("../Config/razorpay_instance");
const crypto = require("crypto");
const Cart = require("../Model/cart_model");
const { createSaleOrder } = require("./sale_order_controller");

const processPayment = asyncHandler(async (req, res) => {
    const { amount, productAndQuantities } = req.body;
    const options = {
        amount: amount * 100,
        currency: "INR",
        notes: {
            productAndQuantities
        }
    };
    const orders = await razorpayInstance.orders.create(options);
    res.status(200).json({
        success: true,
        orders,
    })
})

const getRazorpayKey = asyncHandler(async (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY_ID,
    });
})

const paymentVerification = asyncHandler(async (req, res) => {
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_KEY_SECRET)
        .update(body.toString())
        .digest("hex");
    if (expectedSignature === razorpay_signature) {
        const order = await razorpayInstance.orders.fetch(razorpay_order_id);
        createSaleOrder(order.notes.productAndQuantities, order.amount/100, req.query.userId);
        await Cart.deleteOne({user: req.query.userId});
        return res.redirect(`http://localhost:5173/payment_success?reference=${razorpay_payment_id}`);
    } else {

        res.status(404).json({
            success: false,
            message: "Payment verification failed",
        })
    }
})

module.exports = {processPayment, getRazorpayKey, paymentVerification};
