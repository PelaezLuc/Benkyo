const { getConnection } = require('../db/db');
const { generateError } = require('../helpers/generateError');
const { getFailCards } = require('../db/cards');
const { createFailsDeck, getFailsDeck, getDecks } = require('../db/decks')

const getDecksController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await getDecks(id);

        if (!data) {
            throw generateError(`Este usuario no tiene mazos`);
        }
        else {
            res.send({
                status: 'Ok',
                message: `Listando mazos del usuario con id ${id}`,
                data: data,
            })
        }
    } catch (error) {
        next(error);
    }
}

const getFailsDeckController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await getFailsDeck(id);

        if (!data) {
            throw generateError(`Este usuario no tiene mazo de fallos`);
        }
        else {
            res.send({
                status: 'Ok',
                message: `Listando mazo de fallos del usuario con id ${id}`,
                data: data,
            });
        }
    } catch (error) {
        next(error);
    }
}


//Endpoint que crea un deck de fails para el usuario logueado
const failsDeckController = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection();

        //Compruebo si el usuario está logueado
        const idUserAuth = req.userAuth.id;

        //Compruebo si el usuario tiene tarjetas incorrectas
        const cards = await getFailCards(idUserAuth);

        if (!cards) {
            throw generateError(`El usuario con id${idUserAuth} no tiene tarjetas incorrectas`);
        }
        else {
            //Creo un nuevo mazo fails para el usuario
            await createFailsDeck(idUserAuth);

            res.send({
                status: 'Ok',
                message: `Creado mazo fails para usuario ${idUserAuth}`,
                data: cards,
            })
        }
    } catch (error) {

        next(error);
    } finally {
        if (connection) connection.release();
    }
}

const favouriteDeckController = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    getDecksController, getFailsDeckController, failsDeckController, 
}