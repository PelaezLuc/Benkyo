const express = require('express');
const router = express.Router();
const deckController = require('../../controllers/deckController');
const { userAuth } = require('../../../middlewares/userAuth');

router
    .get('/:id', userAuth, deckController.getDecksController)
    .get('/fails/:id', userAuth, deckController.getFailsDeckController)
    .put('/fails/:id', userAuth, deckController.failsDeckController);


module.exports = router;