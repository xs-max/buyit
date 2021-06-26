const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A category must have a name'],
        trim: true
    },
    
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

categorySchema.virtual('products', {
    ref: 'Procduct',
    foreignField: 'category',
    localField: '_id'
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;