const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/cactchAsync');

exports.getAdminDashboard = catchAsync( async (req, res, next) => {
    // 1) Get tour data from collection

    // 2) Build template

    // 3) buildtemplate using data from step 1

    res.status(200).render('dashboard/admin/dashboard', {
        title: 'Dashboard',
    });
});

exports.getAdminProfile = catchAsync(async (req, res, next) => {

    res.status(200).render('dashboard/admin/profile', {
        title: 'Profile',
    });
})

exports.alert = (req, res, next) => {
    const { alert } = req.query;
    if (alert === 'booking') {
        res.locals.alert = `Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up immediately, please come back later `;

    }

    next();

}