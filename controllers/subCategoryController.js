const factory = require('./handlerFactory');
const SubCategory = require('./../models/categoryModel');

exports.getAllSubCategory = factory.getAll(SubCategory);

exports.getOneSubCategory = factory.getOne(SubCategory);

exports.patchSubCategory = factory.updateOne(SubCategory);

exports.createSubCategory = factory.createOne(SubCategory);

exports.deleteSubCategory = factory.deleteOne(SubCategory);