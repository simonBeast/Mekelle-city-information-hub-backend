const express = require('express');
const localBusinessController = require('../controllers/localBusiness');
const imageUpload = require('../utils/multerConfig');
const router = express.Router();
const authGuard = require('../utils/AuthGuard');

router.route('/').get(localBusinessController.getAllLocalBusinesses).post(imageUpload.single('picture'),authGuard.guard,authGuard.restrictTo("ADMIN"),localBusinessController.createLocalBusiness);
router.route('/:id').get(localBusinessController.getLocalBusiness).patch(authGuard.guard,authGuard.restrictTo("ADMIN"),localBusinessController.updateLocalBusiness).delete(authGuard.guard,authGuard.restrictTo("ADMIN"),localBusinessController.deleteLocalBusiness);

module.exports = router;