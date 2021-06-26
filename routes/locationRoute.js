const express = require('express');
const {getAllLocation, createLocation, getOneLocation, patchLocation, deleteLocation} = require('../controllers/LocationController');



const router = express.Router();

router.route('/')
    .get(getAllLocation)
    .post(createLocation)

router.route('/:id')
    .get(getOneLocation)
    .delete(deleteLocation)
    .patch(patchLocation)


module.exports = router;