const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        minlength: [4, 'Product name must exceed 6 characters']
    }
})
