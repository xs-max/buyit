const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A location must have a name'],
        minlength: [4, 'location name must exceed 6 characters']
    }
})


const Location = mongoose.model('Location', locationSchema);

module.exports = Location;