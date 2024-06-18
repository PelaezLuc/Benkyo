const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deckController');
const { userAuth } = require('../../src/middlewares/userAuth');

router
    .get('/player/:language', deckController.getPlayerDeckController)
    .get('/user/:language/:difficulty', deckController.getUserDeckController);

module.exports = router;