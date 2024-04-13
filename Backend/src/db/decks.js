const { getConnection } = require('./db');
const { generateError } = require('../helpers/generateError');

const getDecks = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT d.id, d.name
                FROM deck d
                JOIN user_deck ud ON d.id = ud.id_deck
                JOIN user u ON ud.id_user = u.id
                WHERE u.id = ?;
            `,[id]
        );

        return result[0];
    } finally {
        if (connection) connection.release();
    }
}

const getFailsDeck = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT d.id, d.name
                FROM deck d
                INNER JOIN user_deck ud ON d.id = ud.id_deck
                WHERE ud.id_user = ? AND d.name like "fails_user_%";
            `,[id]
        );

        if(!result) {
            throw generateError('El usuario no tiene mazo de fallos');
        }

        return result[0];
    } finally {
        if (connection) connection.release();
    }
}

const createFailsDeck = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        //Crea un nuevo mazo fails
        const [] = await connection.query(
            `
                INSERT INTO deck (name) VALUES ('fails_user_${id}');
            `
        );
        
        const [deckId] = await connection.query(
            `
                SELECT id FROM deck WHERE name = 'fails_user_${id}';
            `
        );

        return deckId[0];
    } finally {
        if (connection) connection.release();
    }
}



module.exports = {
    createFailsDeck, getFailsDeck, getDecks,
}