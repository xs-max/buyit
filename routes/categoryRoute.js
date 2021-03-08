const express = require('express');
const {getAllCategory, createCategory} = require('./../controllers/categoryController');



const router = express.Router();

router.route('/')
    .get(getAllCategory)
    .post(createCategory)


module.exports = router;