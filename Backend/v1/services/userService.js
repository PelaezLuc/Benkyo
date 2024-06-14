const { generateError } = require('../../src/helpers/generateError');
const { validateSchema } = require('../../src/helpers/validateSchema');
const { unlink } = require('fs/promises');
const newUserSchema = require('../../src/schemas/newUserSchema')
const editUserSchema = require('../../src/schemas/editUserSchema');
const User = require('../database/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const { userAuth } = require('../../src/middlewares/userAuth');

const createNewUser = async (newUserData) => {
    try {
        await validateSchema(newUserSchema, newUserData);

        const passwordHash = await bcrypt.hash(newUserData.password, 8);

        const newUser = await User.createNewUser(newUserData, passwordHash);
        return newUser;
    } catch (error) {
        throw generateError(error);
    }
}

const getOneUser = async (id) => {
    try {
        const user = await User.getUserById(id);
        return user;
    } catch (error) {
        throw generateError(error);
    }
}

const loginUser = async (userData) => {
    try {
        const { email } = userData;
        const { password } = userData;

        if (!email || !password) {
            throw generateError("Email o contraseña incorrectos", 400);
        }

        const user = await User.getUserByEmail(email);

        if (!user) {
            throw generateError("Email o contraseña incorrectos", 400);
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw generateError('Email o contraseña incorrectos', 401);
        }

        const tokenInfo = { id: user.id };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '30d',
        });

        return token;
    } catch (error) {
        throw generateError(error);
    }
}

const updateUserName = async (userAuthId, newName) => {
    try {
        if (!userAuthId) {
            throw generateError('Header Authorization Missing', 400);
        }

        if (!newName) {
            throw generateError('No has modificado nada', 400);
        }

        await validateSchema(editUserSchema.newNameSchema, newName);

        await User.updateUserName(userAuthId, newName);
    } catch (error) {
        throw generateError(error);
    }
}

const updateUsername = async (userAuthId, newUsername) => {
    try {
        if (!userAuthId) {
            throw generateError('Header Authorization Missing', 400);
        }
        if (!newUsername) {
            throw generateError('No has modificado nada', 400);
        }

        await validateSchema(editUserSchema.newUsernameSchema, newUsername);

        await User.updateUsername(userAuthId, newUsername);
    } catch (error) {
        throw generateError(error);
    }
}

const updateUserStack = async (userAuthId, newStack) => {
    try {
        if (!userAuthId) {
            throw generateError('Header Authorization Missing', 400);
        }

        if (!newStack) {
            throw generateError('No has modificado nada', 400);
        }

        await validateSchema(editUserSchema.newStacknSchema, newStack);

        await User.updateUserStack(userAuthId, newStack);
    } catch (error) {
        throw generateError(error);
    }
}

const updateUserEmail = async (userAuthId, newEmail) => {
    try {
        if (!userAuthId) {
            throw generateError('Header Authorization Missing', 400);
        }

        if (!newEmail) {
            throw generateError('No has modificado nada', 400);
        }

        await validateSchema(editUserSchema.newEmailSchema, newEmail);

        await User.updateUserEmail(userAuthId, newEmail);
    } catch (error) {
        throw generateError(error);
    }
}

const updateUserAvatar = async (userAuthId, userAvatar) => {
    try {
        if (!userAuthId) {
            throw generateError('Header Authorization Missing', 400);
        }

        if (!userAvatar) {
            throw generateError('No has subido ninguna imagen', 400);
        }

        const validImageExtensions = ['.jpg', '.png', '.jpeg'];

        const fileExtension = path.extname(userAvatar.name).toLocaleLowerCase();

        if (!validImageExtensions.includes(fileExtension)) {
            throw generateError('El archivo debe tener extensión .jpg, .jpeg o .png.', 400);
        }

        const sharpImage = sharp(userAvatar.data);

        const uniqueFileName = `${userAuthId}-${uuidv4()}.jpeg`;

        const newImagePath = path.join(__dirname, '..', '..', 'static', uniqueFileName);

        await sharpImage
            .resize(200, 200)
            .jpeg({ quality: 90 })
            .toFile(newImagePath);

        const oldImageFilename = await User.getAvatarFilename(userAuthId);

        if (oldImageFilename) {
            const oldImagePath = path.join(__dirname, '..', '..', 'static', oldImageFilename);

            await fs.unlink(oldImagePath);
        }

        await User.updateUserAvatar(userAuthId, uniqueFileName);
    } catch (error) {
        throw generateError(error);
    }
}

module.exports = {
    createNewUser,
    getOneUser,
    loginUser,
    updateUserName,
    updateUsername,
    updateUserStack,
    updateUserEmail,
    updateUserAvatar
}