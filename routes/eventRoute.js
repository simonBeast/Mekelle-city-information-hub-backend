const express = require('express');
const imageUpload = require('../utils/multerConfig');
const router = express.Router();
const authGuard = require('../utils/AuthGuard');
const eventController = require('../controllers/event');
router.route('/').get(eventController.getAllEvents).post(imageUpload.single('picture'),authGuard.guard,authGuard.restrictTo("ADMIN"),eventController.createEvent);
router.route('/:id').get(eventController.getEvent).patch(authGuard.guard,authGuard.restrictTo("ADMIN"),eventController.updateEvent).delete(authGuard.guard,authGuard.restrictTo("ADMIN"),eventController.deleteEvent);

module.exports = router;