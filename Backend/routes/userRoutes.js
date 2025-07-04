const express = require("express");
const { registerUser, loginUser, createUser, getAllUsers, toggleWishList, getWishList, getUsersCount } = require("../controllers/userController");
const { adminProtected, protected } = require("../Middlewares/authMiddlewares");

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/createuser', adminProtected, createUser);
router.get('/getallusers', adminProtected, getAllUsers);
router.post('/toggewishlist', protected, toggleWishList);
router.get('/getwishlist', protected, getWishList);
router.get('/getrecordcount', adminProtected, getUsersCount);
    
module.exports = router