const asyncHandler = require("express-async-handler");
const User = require("../Model/usermodel");
const generateToken = require("../Config/generateToken");

const registerUser = asyncHandler(async (req, res)=> {
    const {name, email, password, pic} = req.body;
    console.log("_________________________________________")

    if( !name || !email || !password) {
        res.status(400);
        throw new Error("please enter all the fields");
    }

    const userExists = await User.findOne({ email });

    if( userExists ) {
        res.status(200);
        throw new Error("User already Exists")
    }

    const user = await User.create({name, email, password, pic});

    if( user ) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Faied to create user")
    }
})

const loginUser = asyncHandler(async (req, res)=> {
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(200);
        throw new Error("No user found with entered credentials");
    }
})
module.exports = {registerUser, loginUser}