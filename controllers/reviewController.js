const Review = require('./../models/reviewModel');
const catchAsync = require('../utils/cactchAsync');
const AppError  = require('../utils/appError');
const factory = require('./handlerFactory');



exports.getAllReviews = factory.getAll(Review);







exports.getReview = factory.getOne(Review); 

exports.createReview = factory.createOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);