const express = require('express');
const {getAdminDashboard, getAdminProfile, alert, getLoginPage, getRegistrationPage} = require('../controllers/viewsController');
const {isLoggedIn, protect} = require('../controllers/authController');

const router = express.Router();

router.use(alert);

router.get('/', 
// createBookingCheckout,
 isLoggedIn, getAdminDashboard);
router.get('/admin', getAdminDashboard);
router.get('/admin/profile', getAdminProfile);
router.get('/login', getLoginPage);
router.get('/register', getRegistrationPage);


module.exports = router;