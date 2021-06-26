const express = require('express');
const {getAllProducts, getProduct, addProduct, patchProduct, deleteProduct, uploadProductImages, resizeProductImages} = require('./../controllers/productController');
const {protect} = require('../controllers/authController');

const router = express.Router();

router.route('/')
    .get(getAllProducts)
    .post(protect, uploadProductImages, resizeProductImages, addProduct);



router.route('/:id')
    .get(getProduct)
    .patch(protect, patchProduct)
    .delete(protect, deleteProduct)

module.exports = router;