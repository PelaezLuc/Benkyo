const { getConnection } = require('./db');
const { generateError } = require('../helpers/generateError');
const bcrypt = require('bcrypt');

const getUserById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `SELECT id, name, username, description, email FROM user WHERE id = ?`,
            [id]
        );

        if (result.length === 0) {
            throw generateError('No hay ningún usuario con ese id');
        }

        return result[0];
    } finally {
        if (connection) connection.release();
    }
};

const createUser = async (name, username, description, email, password) => {
    let connection;

    try {
        connection = await getConnection();

        const [userId] = await connection.query(
            `
            SELECT id FROM user WHERE email = ?
            `,
            [email]
        );

        if (userId.length > 0) {
            throw generateError(
                'Ya existe un usuario con esa dirección de correo',
                409
            );
        }

        const passwordHash = await bcrypt.hash(password, 8);

        const [newUser] = await connection.query(
            `
            INSERT INTO user (name, username, description, email, password) VALUES (?, ?, ?, ?, ?);
            `,
            [name, username, description, email, passwordHash]
        );

        return newUser.insertId;
    } finally {
        if (connection) connection.release();
    }
};

const getUserByEmail = async (email) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
        SELECT * FROM user WHERE email = ?
      `,
            [email]
        );

        if (result.length === 0) {
            throw generateError('No hay ningún usuario con ese email', 404);
        }

        return result[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    getUserById,
    createUser,
    getUserByEmail,
};
