const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { userAuth } = require('../../src/middlewares/userAuth');

router
    .post('/register', userController.createNewUserController)
    .get('/:id', userController.getOneUserController)
    .post('/login', userController.loginUserController)
    .put('/edit-user-name', userAuth, userController.updateUserNameController)
    .put('/edit-username', userAuth, userController.updateUsernameController)
    .put('/edit-stack', userAuth, userController.updateUserStackController)
    .put('/edit-email', userAuth, userController.updateUserEmailController)
    .put('/edit-user-avatar', userAuth, userController.updateUserAvatarController);

module.exports = router;
