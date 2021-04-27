const express = require('express');
const {getAllCategory, createCategory, getOneCategory, patchCategory, deleteCategory} = require('./../controllers/categoryController');



const router = express.Router();

router.route('/')
    .get(getAllCategory)
    .post(createCategory)

router.route('/:id')
    .get(getOneCategory)
    .delete(deleteCategory)
    .patch(patchCategory)


module.exports = router;