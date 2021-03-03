const express = require('express');
const {getAllProducts, getProduct, addProduct, patchProduct, deleteProduct} = require('./../controllers/productController');

const router = express.Router();

router.route('/')
    .get(getAllProducts)
    .post(addProduct);


router.route('/:id')
    .get(getProduct)
    .patch(patchProduct)
    .delete(deleteProduct)

module.exports = router;