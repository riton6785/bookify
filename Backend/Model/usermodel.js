const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: { type: String, required: true},
    role: { type: String, enum: ['user', 'admin', 'seller'], default: 'user' },
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    gender: {type: String, enum: ["male", "female", "other", "prefer not say"], default: "prefer not say"},
    phone: {type: String},
    completeAddress: {type: String},
    city: {type: String},
    state: {type: String},
    pincode: {type: String},
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
        }
    ]
}, {
    timestamps: true, 
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre("save", async function(next) {
    if(!this.isModified) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
const User = mongoose.model("user", UserSchema);

const createAdminUser = asyncHandler(async()=>{
    let adminUser = await User.findOne({email: "testadmin@1.com"});
    if( !adminUser ) {
        adminUser = await User.create({
            name: "Admin",
            email: "testadmin@1.com",
            password: "Admin",
            role: 'admin',

        })
    }
});
createAdminUser();

module.exports = User;