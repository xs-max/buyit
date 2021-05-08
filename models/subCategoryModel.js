const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A category must have a name'],
        trim: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    }
}
,
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;