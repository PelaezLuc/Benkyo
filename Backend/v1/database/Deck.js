const { getConnection } = require('./getConnection');

const getPlayerDeck = async (language) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT card.*
                FROM card
                JOIN deck ON card.deck_id = deck.id
                JOIN language ON card.language_id = language.id
                JOIN difficulty ON card.difficulty_id = difficulty.id
                WHERE language.name = ? AND difficulty.name = 'junior'                
            `,
            [language]
        );

        return result;
    } finally {
        if (connection) connection.release();
    }
}

const getUserDeck = async (language, difficulty) => {
    let connection;

    try {
        connection = await getConnection();

        const [deck] = await connection.query(
            `
                SELECT card.*
                FROM card
                JOIN deck ON card.deck_id = deck.id
                JOIN language ON card.language_id = language.id
                JOIN difficulty ON card.difficulty_id = difficulty.id
                WHERE language.name = ? AND difficulty.name = ?
            `,
            [language, difficulty]
        )

        return deck;
    } finally {
        if (connection) connection.release();
    }
}

module.exports = {
    getPlayerDeck,
    getUserDeck
}