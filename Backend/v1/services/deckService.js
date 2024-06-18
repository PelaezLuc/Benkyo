const { generateError } = require("../../src/helpers/generateError")
const Deck = require('../database/Deck');

const getPlayerDeck = async (language) => {
    try {
        if (!language) {
            throw generateError('El lenguaje es requerido', 400);

        }

        if (language !== 'javascript' && language !== 'java') {
            throw generateError('Lenguaje no disponible', 400);
        }

        const deck = await Deck.getPlayerDeck(language);

        return deck;
    } catch (error) {
        throw generateError(error)
    }
}

const getUserDeck = async (language, difficulty) => {
    try {
        if (!language) {
            throw generateError('El lenguaje es requerido', 400);

        }

        if (!difficulty) {
            throw generateError('El nivel es requerido', 400);
        }

        if (language !== 'javascript' && language !== 'java') {
            throw generateError('Lenguaje no disponible', 400);
        }

        if (difficulty !== 'junior' && difficulty !== 'middle' && difficulty !== 'senior') {
            throw generateError('Nivel no disponible', 400);
        }

        const deck = await Deck.getUserDeck(language, difficulty);

        return deck;
    } catch (error) {
        throw generateError(error);
    }
}

module.exports = {
    getPlayerDeck,
    getUserDeck
}