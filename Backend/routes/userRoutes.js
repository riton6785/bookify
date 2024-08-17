const express = require("express");
const { registerUser, loginUser, createUser, getAllUsers } = require("../controllers/userController");
const { adminProtected } = require("../Middlewares/authMiddlewares");

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/createuser', adminProtected, createUser);
router.get('/getallusers', adminProtected, getAllUsers);
    
module.exports = router