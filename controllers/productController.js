const multer = require('multer');
const sharp = require('sharp');
const appError = require('./../utils/appError');
const catchAsync = require('./../utils/cactchAsync');
const factory = require('./handlerFactory');
const Product = require('./../models/productModel');
const User = require('../models/userModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an Image ! please upload only images', 404), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadProductImages = upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {

    if (!req.files.imageCover || !req.files.images) return next();

    // Cover Image
    req.body.imageCover = `buyit-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${req.body.imageCover}`);

    // Images
    await Promise.all(req.files.images.map(async (file, i) => {
        const filename = `buyit-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
        await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/products/${filename}`);

        req.body.images.push(filename);
    }));

    next();
});

exports.getAllProducts = factory.getAll(Product);

exports.getProduct = factory.getOne(Product);

exports.addProduct = catchAsync(async (res, req, next) => {
    const product = await Product.create(req.body);
    await User.findByIdAndUpdate(req.user.id, {"role" : "vendor"});
    
    res.status(201).json({
        status: 'success',
        data: {
            product 
        }
    });
        
});

exports.patchProduct = factory.updateOne(Product);

exports.deleteProduct = factory.deleteOne(Product);