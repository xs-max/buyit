const User = require('../models/userModel');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/cactchAsync');
const Category = require('../models/categoryModel');


// admin

exports.index = catchAsync( async (req, res, next) => {
    // fetch data from db
    const categories = await Category.find();
    const products = await Product.find().limit(16);
    if (!req.user) {
        var user = null;
    } else {
         user = await User.findById(req.user.id);
     }
    

    res.status(200).render('index', {
        title: 'Home Page',
        user,
        products,
        categories
    });

});

exports.getProducts = catchAsync( async (req, res, next) => {
    // fetch product from db
    const categories = await Category.find();
    if (!req.user) {
        var user = null;
    } else {
         user = await User.findById(req.user.id);
     }

    res.status(200).render('products', {
        title: 'products Page',
        user,
        categories

    });

});

exports.getDetails = catchAsync( async (req, res, next) => {

    const categories = await Category.find();
    const product = await Product.findById(req.params.product).populate('location').populate('user');
    if (!req.user) {
        var user = null;
    } else {
         user = await User.findById(req.user.id);
     }



    res.status(200).render('details', {
        title: 'PRODUCT DETAILS',
        user,
        product,
        categories
    })
});

exports.getAddProduct = catchAsync(async (req, res, next) => {

    const categories = await Category.find();
    if (!req.user) {
        var user = null;
    } else {
         user = await User.findById(req.user.id);
     }

    res.status(200).render('addproduct', {
        title: "NEW PRODUCT",
        user,
        categories
    });
});




exports.getAdminDashboard = catchAsync( async (req, res, next) => {
    // 1) Get user data from collection
    // const user = await User.findById(req.user.id);
    const users = await User.find();
    // 2) Build template

    // 3) buildtemplate using data from step 1

    res.status(200).render('dashboard/admin/dashboard', {
        title: 'Dashboard',
        // user,
        users

    });
});

exports.getAdminProfile = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).render('dashboard/admin/profile', {
        title: 'Profile',
        user
    });
});

exports.getVendors = catchAsync(async (req, res, next) => {
    const users = await User.find({role : 'vendor'});

    res.status(200).render('dashboard/admin/vendors', {
        title : 'Users',
        users
    });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).render('dashboard/admin/vendors', {
        title : 'Users',
        users
    });
});


exports.getLoginPage = catchAsync(async (req, res, next) => {
    res.status(200).render('login', {
        title: 'Login'
    });
});

exports.getRegistrationPage = catchAsync(async (req, res, next) => {
    res.status(200).render('register', {
        title: 'Register'
    });
});


exports.alert = (req, res, next) => {
    const { alert } = req.query;
    if (alert === 'booking') {
        res.locals.alert = `Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up immediately, please come back later `;

    }

    next();

}