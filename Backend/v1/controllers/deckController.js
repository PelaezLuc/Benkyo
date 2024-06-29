const deckService = require('../services/deckService');

const getPlayerDeckController = async (req, res, next) => {
    try {
        const { language } = req.params;

        const deck = await deckService.getPlayerDeck(language);

        res.send({
            status: 'OK',
            data: deck
        });
    } catch (error) {
        next(error);
    }

}

const getUserDeckController = async (req, res, next) => {
    try {
        const { language, difficulty } = req.params;

        const deck = await deckService.getUserDeck(language, difficulty);

        res.send({
            status: 'OK',
            data: deck
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPlayerDeckController,
    getUserDeckController
}