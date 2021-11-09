const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const userSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name']
    }, 
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'] 
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Minimum password length is 8 characters']
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Company', 
        default: "617fdd1f6c9017a53aece026"
    },
    department: {
        type: String
    },
    position: {
        type: String
    },
    phone_number: {
        type: String 
    },
    location: {
        type: String
    },
    token: {
        type: String
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;