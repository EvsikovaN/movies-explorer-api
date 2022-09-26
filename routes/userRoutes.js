const express = require('express');
const userController = require('../controllers/userControllers');
const { validateUser } = require('../utils/validation');

const userRoutes = express.Router();

userRoutes.get('/me', userController.getUserById);
userRoutes.patch('/me', validateUser, userController.updateProfileInfo);

module.exports = { userRoutes };
