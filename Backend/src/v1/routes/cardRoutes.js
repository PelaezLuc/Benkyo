const express = require('express');
const router = express.Router();
const cardController = require('../../controllers/cardController');
const { userAuth } = require('../../../middlewares/userAuth');

router
    .get('/:id', cardController.getCardByIdController)
    .post('/level/language', cardController.getCardsByLangAndLevel)
    .get('/user_card/:id', cardController.getUserCardController)
    .put('/correct/:idUser/:idCard', userAuth, cardController.setCorrectCard)
    .put('/fail/:idUser/:idCard', userAuth, cardController.setFailCard)
    .put(
        '/favourite/:idUser/id:Card',
        userAuth,
        cardController.setFavouriteCard
    )
    .put('/delete_favourite/:id', userAuth, cardController.deleteFavouriteCard)
    .get('/fails/:id', cardController.getFailCardsByUserId)
    .get('/favourites/:id', cardController.getFavouriteCardsByUserId)
    .get('/correct/:id', cardController.getCorrectCardsByUserId);

module.exports = router;
