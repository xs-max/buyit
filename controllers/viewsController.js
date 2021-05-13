const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/cactchAsync');


// admin
exports.getAdminDashboard = catchAsync( async (req, res, next) => {
    // 1) Get tour data from collection
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
    const users = await User.find({role : 'vendor'}).populate({
        path : 'products',
        fields : 'name'
    });

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



exports.alert = (req, res, next) => {
    const { alert } = req.query;
    if (alert === 'booking') {
        res.locals.alert = `Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up immediately, please come back later `;

    }

    next();

}