const { getConnection } = require('./getConnection');
const { generateError } = require('../../src/helpers/generateError');
const { get, use } = require('../routes/userRoutes');

const createNewUser = async ({ name, username, stack, email }, passwordHash) => {
    let connection;

    try {
        connection = await getConnection();

        const [invalidEmail] = await connection.query(
            `
                SELECT id FROM user WHERE email = ?
            `,
            [email]
        );

        const [invalidUsername] = await connection.query(
            `
                SELECT id FROM user WHERE username = ?
            `,
            [username]
        );

        if (invalidEmail.length > 0) {
            throw generateError(
                'Ya existe un usuario con esa dirección de correo',
                409
            );

        } else if (invalidUsername.length > 0) {
            throw generateError(
                'Nombre de usuario no disponible',
                409
            );
        }

        const [newUser] = await connection.query(
            `
                INSERT INTO user (name, username, stack, email, password) VALUES (?, ?, ?, ?, ?);
            `,
            [name, username, stack, email, passwordHash]
        );

        return newUser.insertId;
    } finally {
        if (connection) connection.release();
    }
}

const getUserById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT * FROM user WHERE id = ?
            `,
            [id]
        );

        if (result.length === 0) {
            throw generateError(`User id: ${id} not found`, 404);
        }

        return result[0];
    } finally {
        if (connection) connection.release();
    }
}

const getUserByEmail = async (email) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT * FROM user WHERE email = ?
            `
            , [email]
        );

        console.log(result[0])

        return result[0];
    } finally {
        if (connection) connection.release();
    }
}

const updateUserName = async (userAuthId, newName) => {
    let connection;

    console.log(newName);

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT name FROM user WHERE id = ? 
            `,
            [userAuthId]
        );

        if (result[0] === newName) {
            throw generateError('No has modificado nada', 400);
        }

        await connection.query(
            `
                UPDATE user SET name = ? WHERE id = ?
            `
            , [newName, userAuthId]
        );
    } finally {
        if (connection) connection.release();
    }
}

const updateUsername = async (userAuthId, newUserame) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT id FROM user WHERE username = ? 
            `,
            [newUserame]
        );

        if (result.length > 0) {
            throw generateError('Nombre de usuario no disponible', 400);
        }

        await connection.query(
            `
                UPDATE user SET username = ? WHERE id = ?
            `,
            [newUserame, userAuthId]
        );
    } finally {
        if (connection) connection.release();
    }
}

const updateUserStack = async (userAuthId, newStack) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT stack FROM user WHERE id = ?
            `,
            [newStack]
        )

        if (result[0] === newStack) {
            throw generateError('No has modificado nada', 400);
        }

        await connection.query(
            `
                UPDATE user SET stack = ? WHERE id = ?
            `,
            [newStack, userAuthId]
        )
    } finally {
        if (connection) connection.release();
    }
}

const updateUserEmail = async (userAuthId, newEmail) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT id FROM user WHERE email = ?
            `,
            [newEmail]
        )

        if (result.length > 0) {
            throw generateError('Email no disponible');
        }

        await connection.query(
            `
                UPDATE user SET email = ? WHERE id = ?
            `,
            [newEmail, userAuthId]
        );
    } catch (error) {
        throw generateError(error);
    }
}

const getAvatarFilename = async (userAuthId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT avatar FROM user WHERE id = ?
            `,
            [userAuthId]
        );

        const { avatar } = result[0];

        return avatar;
    } finally {
        if (connection) connection.release();
    }
}

const updateUserAvatar = async (userAuthId, uniqueFileName) => {
    let connection;

    console.log(uniqueFileName);

    try {
        connection = await getConnection();

        await connection.query(
            `
                UPDATE user SET avatar = ? WHERE id = ?
            `,
            [uniqueFileName, userAuthId]
        );
    } catch (error) {
        throw generateError(error);
    }
}

module.exports = {
    createNewUser,
    getUserById,
    getUserByEmail,
    updateUserName,
    updateUsername,
    updateUserStack,
    updateUserEmail,
    getAvatarFilename,
    updateUserAvatar
}

