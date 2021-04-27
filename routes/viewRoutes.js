const express = require('express');
const {getAdminDashboard, getAdminProfile, alert} = require('../controllers/viewsController');
const {isLoggedIn, protect} = require('../controllers/authController');

const router = express.Router();

router.use(alert);

router.get('/', 
// createBookingCheckout,
 isLoggedIn, getAdminDashboard);
router.get('/admin', getAdminDashboard);
router.get('/admin/profile', getAdminProfile);


module.exports = router;