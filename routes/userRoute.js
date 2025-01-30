const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const AuthGuard = require('../utils/AuthGuard').guard;
router.post('/signup',authController.signUp);
router.post('/login',authController.login);
router.post('/forgotPassword',authController.forgotPassword);
router.patch('/resetPassword/:resetToken',authController.resetPassword);
router.route('/').get(userController.getAllUsers);
router.route('/changePassword/:id').patch(userController.changePassword);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;