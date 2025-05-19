const asyncHandler = require("express-async-handler");
const User = require("../Model/usermodel");
const generateToken = require("../Config/generateToken");

const registerUser = asyncHandler(async (req, res)=> {
    const {name, email, password, pic} = req.body;

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
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("No user found with entered credentials");
    }
})

const createUser = asyncHandler(async(req, res)=> {
    const { name, email, password, pic, role } = req.body;
    if( !name || !email || !password) {
        res.status(400);
        throw new Error("please enter all the fields");
    }

    const userExists = await User.findOne({ email });

    if( userExists ) {
        res.status(200);
        throw new Error("User already Exists")
    }

    const user = await User.create({name, email, password, pic, role});

    if( user ) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            role: user.role,
        });
    } else {
        res.status(400);
        throw new Error("Faied to create user")
    }
})

const getAllUsers = asyncHandler(async(req, res) => {
    const allUsers = await User.find({});
    res.send(allUsers)
})

const toggleWishList = asyncHandler(async(req, res) => {
    const { bookId } = req.body;
    const user = await User.findById(req.user._id);
    if(!user) {
        return res.status(400).json({messahe: "User not found Please login firt"});
    }

    if (user.wishList.includes(bookId)) {
        const index = user.wishList.indexOf(bookId);
        user.wishList.splice(index, 1);
        await user.save();
        return res.status(200).json({message: "Book removed form wishList"});
    } else {
        user.wishList.push(bookId);
        await user.save();
        return res.status(200).json({message: "Book added to wishList"});
    }
})

const getWishList = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    const wishListItems = user.wishList;
    if(!wishListItems) {
        return res.status(200).json({message: "No items in wishList"});
    } else {
        return res.status(200).json({wishListItems});
    }
})
module.exports = {registerUser, loginUser, createUser, getAllUsers, toggleWishList, getWishList}