const express = require('express');
const {getAdminDashboard, getAdminProfile, alert, getLoginPage, getRegistrationPage, index, getProducts, getDetails, getAddProduct} = require('../controllers/viewsController');
const {isLoggedIn, protect} = require('../controllers/authController');

const router = express.Router();

router.use(alert);

router.get('/', index);
router.get('/new-product', getAddProduct)
router.get('/products/:category', getProducts);
router.get('/admin', getAdminDashboard);
router.get('/admin/profile', getAdminProfile);
router.get('/login', getLoginPage);
router.get('/register', getRegistrationPage);
router.get('/details', getDetails);


module.exports = router;