const express = require('express');
const {getAllSubCategory, getOneSubCategory, patchSubCategory, deleteSubCategory, createSubCategory} = require('./../controllers/subCategoryController');

const router = express.Router();

router.route('/')
    .get(getAllSubCategory)
    .post(createSubCategory)

router.route('/:id')
    .get(getOneSubCategory)
    .delete(deleteSubCategory)
    .patch(patchSubCategory)


module.exports = router;