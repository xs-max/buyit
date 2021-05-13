// const appError = require('./../utils/appError');
// const catchAsync = require('./../utils/cactchAsync');
const factory = require('./handlerFactory');
const Category = require('./../models/categoryModel');

exports.getAllCategory = factory.getAll(Category);

exports.getOneCategory = factory.getOne(Category);

exports.patchCategory = factory.updateOne(Category);

exports.createCategory = factory.createOne(Category);

exports.deleteCategory = factory.deleteOne(Category);


 