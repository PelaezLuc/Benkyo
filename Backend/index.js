require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const v1UserRouter = require('./v1/routes/userRoutes');
const v1DeckRouter = require('./v1/routes/deckRoutes');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); //Parsea los json recogidos en el req.body
app.use(morgan('dev')); //Registra el tipo de petición HTTP y la muestra por consola
app.use(fileUpload()); //Permite leer el body en formato form-data
app.use(cors());

app.use('/api/v1/user', v1UserRouter);
app.use('/api/v1/deck', v1DeckRouter);
// app.use('/api/v1/trophy',);

app.use((error, req, res, next) => {
    // Middleware de gestión de errores genéricos
    console.error(error);

    res.status(error.httpSatus || 500).send({
        status: 'error',
        message: error.message,
    });
});

app.listen(PORT, () => {
    console.log(`Sever listening on port ${PORT}`);
});
