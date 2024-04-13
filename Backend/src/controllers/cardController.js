const { getCardById, getCards, getUserCard, putCorrect, putFail, 
putFavourite, deleteFavourite, getFailCards, getFavouriteCards, getCorrectCards } = require('../db/cards');

const getCardByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const card = await getCardById(id);

        console.log(card);

        res.send({
            status: `Card with id ${id} ok`,
            data: card,
        });
    } catch(error) {
        next(error);
    }
};

const getCardsByLangAndLevel = async (req, res, next) => {
    try {
        const { language } = req.body;
        const { level } = req.body;

        const cards = await getCards(language, level);

        res.send({
            status: 'ok',
            data: cards,
        });
    } catch(error) {
        next(error);
    }
};

const getUserCardController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const card = await getUserCard(id);

        res.send({
            status: 'ok',
            data: card,
        });
    } catch(error) {
        next(error);
    }
}

const setCorrectCard = async (req, res, next) => {
    try {
        const { idUser, idCard } = req.params;

        await putCorrect(idUser, idCard);

        res.send({
            status: 'ok',
            message: `Tarjeta con id ${idCard} marcada como correcta para el usuario con id ${idUser}`
        });
    } catch(error) {
        next(error);
    }
}

const setFailCard = async (req, res, next) => {
    try {
        const { id } = req.params;

        const card = await putFail(id);

        res.send({
            status: 'ok',
            data: card,
        });
    } catch(error) {
        next(error);
    }
}

const setFavouriteCard = async (req, res, next) => {
    try {
        const { id } = req.params;

        const card = await putFavourite(id);

        res.send({
            status: 'ok',
            data: card,
        });
    } catch(error) {
        next(error);
    }
}

const deleteFavouriteCard = async (req, res, next) => {
    try {
        const { id } = req.params;

        const card = await deleteFavourite(id);

        res.send({
            status: 'ok',
            data: card,
        });
    } catch(error) {
        next(error);
    }
}

const getFailCardsByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cards = await getFailCards(id);

        res.send({
            status: 'ok',
            data: cards,
        });
    } catch(error) {
        next(error);
    }
};

const getFavouriteCardsByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cards = await getFavouriteCards(id);

        res.send({
            status: 'ok',
            data: cards,
        });
    } catch(error) {
        next(error);
    }
};

const getCorrectCardsByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cards = await getCorrectCards(id);

        res.send({
            status: 'ok',
            data: cards,
        });
    } catch(error) {
        next(error);
    }
};




module.exports = {
    getCardByIdController, 
    getCardsByLangAndLevel, 
    getUserCardController,
    setCorrectCard, 
    setFailCard,
    setFavouriteCard, 
    deleteFavouriteCard,
    getFailCardsByUserId, 
    getFavouriteCardsByUserId,
    getCorrectCardsByUserId,
};