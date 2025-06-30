const express = require("express");
const { processPayment, getRazorpayKey, paymentVerification } = require("../controllers/razorpay_controller");
const { protected } = require("../Middlewares/authMiddlewares");

const router = express.Router();

router.post("/process/payment", protected, processPayment);
router.get("/razorpaykey",protected, getRazorpayKey);
router.post("/payment_verification", paymentVerification);
module.exports = router;
