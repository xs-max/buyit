const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        minlength: [6, 'Product name must exceed 6 characters']
    },
    description: {
        type: String,
        required: [true, 'A product must have a description'],
        minlength: [15, 'Description is too short'],
        maxlength: [150, 'Description must not Exceed 150 characters']
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price']
    },
    imageCover: {
        type: String,
        required: [true, 'A product must have a cover image']
    },
    images: [String],
    location: {
        type: mongoose.Schema.ObjectId,
        ref: 'Location',
        required: [true, 'A product must have a location'],
    },
    condition: {
        type: String,
        required: []
    },
    negotiable: Boolean
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;