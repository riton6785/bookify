const JWT = require("jsonwebtoken")
const asyncHandler = require("express-async-handler");
const User = require("../Model/usermodel");

const adminProtected = asyncHandler(async (req, res, next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = JWT.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            if ( req.user.role === "admin" ) {
                next();
            }

        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token verification failed");
        }
    }
    else {
        res.status(401);
        throw new Error("Not authorized, no token provided");
    }
})

const protected = asyncHandler(async (req, res, next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = JWT.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next()
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token verification failed");
        }
    }
    else {
        res.status(401);
        throw new Error("Not authorized, no token provided");
    }
})

module.exports = {adminProtected, protected}