const express = require('express');
const router = express.Router();
const cityServiceController = require('../controllers/cityService');
const imageUpload = require('../utils/multerConfig');
const authGuard = require("../utils/AuthGuard");

router.route('/').get(cityServiceController.getAllCityServices).post(imageUpload.single('picture'),authGuard.guard,authGuard.restrictTo("ADMIN"),cityServiceController.createCityService);
router.route('/:id').get(cityServiceController.getCityService).patch(authGuard.guard,authGuard.restrictTo("ADMIN"),cityServiceController.updateCityService).delete(authGuard.guard,authGuard.restrictTo("ADMIN"),cityServiceController.deleteCityService);

module.exports = router;