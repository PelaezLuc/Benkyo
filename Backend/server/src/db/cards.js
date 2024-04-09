const { getConnection } = require('./db');
const { generateError } = require('../helpers/generateError');

const getCardById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `SELECT * FROM card WHERE id = ?`,
            [id]
        );

        if(result.length === 0) {
            throw generateError(`Card con id ${id} no encontrada`);
        }

        return result[0]
    } finally {
        if (connection) connection.release();
    }
}

const getCards = async (language, level) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `SELECT * FROM card INNER JOIN language ON card.id_language = language.id INNER JOIN level ON card.id_level = 
            level.id WHERE language.name = ? AND level.name = ?;`,
            [language, level]
        );

        if(result.length === 0) {
            throw generateError(`No existen tarjetas con ese lenguaje y ese nivel`);
        }
      
        return result;
    } finally {
        if (connection) connection.release();
    }
}

const getUserCard = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `SELECT * FROM user_card WHERE id = ?;`,
            [id]
        );

        if(result.length === 0) {
            throw generateError(`El usuario no ha respondido la tarjeta correctamente`);
        }
    
        return result;
    } catch (error) {
        
    }finally {
        if (connection) connection.release();
    }
}

const putCorrect = async (idUser, idCard) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                UPDATE user_card
                JOIN user ON user.id = user_card.id
                JOIN card ON card.id = user_card.id
                SET user_card.is_correct = 1
                WHERE user.id = ? AND card.id = ?;
            `,
            [idUser, idCard]
        );

        if(result.length === 0) {
            throw generateError(`El usuario no ha respondido la tarjeta correctamente`);
        }
    
        return result;
    } finally {
        if (connection) connection.release();
    }
}

const putFail = async (id) => {
    
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `UPDATE user_card SET is_correct = 0 WHERE id = ?;`,
            [id]
        );

        if(result.length === 0) {
            throw generateError(`El usuario ha respondido la tarjeta correctamente`);
        }
    
        return result;
    } finally {
        if (connection) connection.release();
    }
}

const putFavourite = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `UPDATE user_card SET is_favourite = 1 WHERE id = ?;`,
            [id]
        );

        if(result.length === 0) {
            throw generateError(`El usuario no ha añadido la tarjeta a favoritos correctamente`);
        }
    
        return result;
    } finally {
        if (connection) connection.release();
    }
}

const deleteFavourite = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `UPDATE user_card SET is_favourite = 0 WHERE id = ?;`,
            [id]
        );

        if(result.length === 0) {
            throw generateError(`El usuario no ha eliminado la tarjeta a favoritos correctamente`);
        }
    
        return result;
    } finally {
        if (connection) connection.release();
    }
}

const getFailCards = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `SELECT * FROM card INNER JOIN user_card ON card.id = user_card.id_card WHERE user_card.id_user = ? AND user_card.is_correct = 0;`,
            [id]
        );

        if(result.length === 0) {
            throw generateError(`No existen tarjetas fallidas para este usuario`);
        }
        
        return result;
    } finally {
        if (connection) connection.release();
    }
}

const getFavouriteCards = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `SELECT * FROM card INNER JOIN user_card ON card.id = user_card.id_card WHERE user_card.id_user = ? AND user_card.is_favourite = 1;`,
            [id]
        );

        if(result.length === 0) {
            throw generateError(`No existen tarjetas favoritas para este usuario`);
        }

        return result;
    } finally {
        if (connection) connection.release();
    }
}

const getCorrectCards = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `SELECT * FROM card INNER JOIN user_card ON card.id = user_card.id_card WHERE user_card.id_user = ? AND user_card.is_correct = 1;`,
            [id]
        );

        if(result.length === 0) {
            throw generateError(`No existen tarjetas correctas para este usuario`);
        }

        return result;
    } finally {
        if (connection) connection.release();
    }
}

module.exports = {
    getCardById, getCards, getUserCard, putCorrect, putFail, putFavourite, deleteFavourite, getFailCards, getFavouriteCards, getCorrectCards,
}