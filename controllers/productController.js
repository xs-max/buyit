const appError = require('./../utils/appError');
const catchAsync = require('./../utils/cactchAsync');
const factory = require('./handlerFactory');
const Product = require('./../models/productModel');
const User = require('../models/userModel');

exports.getAllProducts = factory.getAll(Product);

exports.getProduct = factory.getOne(Product);

exports.addProduct = catchAsync(async (res, req, next) => {
    const product = await Product.create(req.body);
    await User.findByIdAndUpdate(req.user, req.body, {
        new: true,
        runValidators: true
    }) 
    
    res.status(201).json({
        status: 'success',
        data: {
            product 
        }
    });
        
});

exports.patchProduct = factory.updateOne(Product);

exports.deleteProduct = factory.deleteOne(Product);