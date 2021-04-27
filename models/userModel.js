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

userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) {
        return next();
    }

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre('save', async function(next) {
    // Only run this function if password was modified
    if(!this.isModified('password')) return next();
    //Hash password
    this.password = await bcrypt.hash(this.password, 12)
    // delete passwordConfirm
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({active: {$ne: false}});
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        // console.log(this.passwordChangedAt, JWTTimestamp);
        return JWTTimestamp < changedTimestamp;
    }

    // False means not changed
    return false;
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // console.log({resetToken}, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;