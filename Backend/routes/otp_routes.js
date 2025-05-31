const express = require("express");
const { route } = require("./userRoutes");
const { sendOTP } = require("../controllers/otp_controller");

const router = express.Router();

router.post("/sendotp", sendOTP)
module.exports = router;