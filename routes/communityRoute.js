const imageUpload = require('../utils/multerConfig');
const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityBullet');
const authGuard = require("../utils/AuthGuard");

router.route('/').get(communityController.getAllCommunityBullets).post(imageUpload.single('picture'),authGuard.guard,authGuard.restrictTo("ADMIN"),communityController.createCommunityBullet);

router.route('/:id').get(communityController.getCommunityBullet).patch(imageUpload.single('picture'),communityController.updateCommunityBullet).delete(communityController.deleteCommunityBullet);

module.exports = router;