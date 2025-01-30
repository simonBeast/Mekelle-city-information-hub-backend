const express = require('express');
const authGuard = require('../utils/AuthGuard');
const router = express.Router();
const emergencyController = require('../controllers/emergency');

router.route('/').get(emergencyController.getAllEmergencies).post(authGuard.guard,authGuard.restrictTo("ADMIN"),emergencyController.createEmergency);
router.route('/:id').get(emergencyController.getEmergency).patch(authGuard.guard,authGuard.restrictTo("ADMIN"),emergencyController.updateEmergency).delete(authGuard.guard,authGuard.restrictTo("ADMIN"),emergencyController.deleteEmergency);

module.exports = router;