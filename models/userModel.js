const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        minlength: [3, 'Name should be more than 3 chracters'],
        maxlength: [40, 'Name should not be more than 40 characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'A user must have a email'],
        unique: true,
        validate: [validator.isEmail, 'Entera valid email'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // Only works on save and create
            validator: function(el) {
                return this.password === el;
            },
            message: 'Passwords don\'t match'
        }
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'vendor', 'admin'],
        default: 'user'
    },
    phone: {
        type: String,
        maxlength: [14, 'Enter a valid phone number'],
        minlength: [7, 'Enter a valid number'],
        validate: {
            validator: function (el) {
                const values = ['+', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
                const elements = el.split('');
                elements.forEach(element => {
                    if (!values.includes(element)) return false;
                });
            },
            message: 'Enter a valid phone number'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'offline',
        enum: ['online', 'offline']
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;