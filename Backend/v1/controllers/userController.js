const userService = require('../services/userService');

const createNewUserController = async (req, res, next) => {
    try {
        const newUserData = req.body;

        const newUser = await userService.createNewUser(newUserData);

        res.send({
            status: 'OK',
            data: newUser
        });
    } catch (error) {
        next(error);
    }
}

const getOneUserController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userService.getOneUser(id);

        res.send({
            status: "OK",
            data: user
        });
    } catch (error) {
        next(error);
    }
}

const loginUserController = async (req, res, next) => {
    try {
        const userData = req.body;

        const userToken = await userService.loginUser(userData);

        res.send({
            status: 'OK',
            token: userToken
        });
    } catch (error) {
        next(error);
    }
}

const updateUserNameController = async (req, res, next) => {
    try {
        const userAuthId = req.userAuth.id;
        const { newName } = req.body;

        console.log(req.body);
        console.log(userAuthId);
        console.log(newName);

        await userService.updateUserName(userAuthId, newName);

        res.send({
            status: "OK",
            message: `User id: ${userAuthId} name updated`
        });
    } catch (error) {
        next(error)
    }
}

const updateUsernameController = async (req, res, next) => {
    try {
        const userAuthId = req.userAuth.id;
        const { newUsername } = req.body;

        await userService.updateUsername(userAuthId, newUsername);

        res.send({
            status: "OK",
            message: `Username from user id: ${userAuthId} updated`
        });
    } catch (error) {
        next(error);
    }
}

const updateUserStackController = async (req, res, next) => {
    try {
        const userAuthId = req.userAuth.id;
        const { newStack } = req.body;

        await userService.updateUserStack(userAuthId, newStack);

        res.send({
            status: "OK",
            message: `Stack from user id: ${userAuthId} updated`
        });
    } catch (error) {
        next(error);
    }
}

const updateUserEmailController = async (req, res, next) => {
    try {
        const userAuthId = req.userAuth.id;
        const { newEmail } = req.body;

        await userService.updateUserEmail(userAuthId, newEmail);

        res.send({
            status: 'OK',
            message: `Email from user id: ${userAuthId} updated`
        });
    } catch (error) {
        next(error);
    }
}

const updateUserAvatarController = async (req, res, next) => {
    try {
        const userAuthId = req.userAuth.id;

        const userAvatar = req.files.userAvatar;

        await userService.updateUserAvatar(userAuthId, userAvatar);

        res.send({
            status: 'OK',
            message: `Avatar user id: ${userAuthId} image updated`
        });
    } catch (error) {
        next(error);
    }
}

const updateUserPasswordController = async (req, res, next) => {
    try {
        const userAuthId = req.userAuth.id;

        const userNewData = req.body;

        await userService.updateUserPassword(userAuthId, userNewData);

        res.send({
            status: 'OK',
            message: `Password for user id: ${userAuthId} updated`
        });
    } catch (error) {
        next(error);
    }
}

const deleteUserController = async (req, res, next) => {
    try {
        const userAuthId = req.userAuth.id;

        const userData = req.body;

        await userService.deleteUser(userAuthId, userData);

        res.send({
            status: 'OK',
            message: `User id: ${userAuthId} deleted`
        });
    } catch (error) {
        next(error);
    }
}

const deleteUserAvatarController = async (req, res, next) => {
    try {
        const userAuthId = req.userAuth.id;

        await userService.deleteUserAvatar(userAuthId);

        res.send({
            status: 'OK',
            message: `Avatar from user id: ${userAuthId} deleted`
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createNewUserController,
    getOneUserController,
    loginUserController,
    updateUserNameController,
    updateUsernameController,
    updateUserStackController,
    updateUserEmailController,
    updateUserAvatarController,
    updateUserPasswordController,
    deleteUserAvatarController,
    deleteUserController
};
