const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Please provide a first name"],
    },
    last_name: {
        type: String,
        required: [true, "Please provide a last name"],
    },
    email: {
        type: String,
        required: [true, "Please provide the email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        min: 8
    }, 
    // incase of any admin
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true,
})


module.exports= mongoose.model('User', userSchema)