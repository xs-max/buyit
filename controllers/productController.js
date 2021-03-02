const appError = require('./../utils/appError');
const catchAsync = require('./../utils/cactchAsync');
const factory = require('./handlerFactory');
const Product = require('./../models/productModel');

exports.getAllProducts = factory.getAll(Product);

exports.getProduct = factory.getOne(Product);

exports.addProduct = factory.createOne(Product);

exports.patchProduct = factory.updateOne(Product);

exports.deleteProduct = factory.deleteOne(Product);