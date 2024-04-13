# API para estudiantes de aplicación

Consiste en un juego en el que se presentan tarjetas
por nivel y lenguaje de programación que contienen preguntas
con una respuesta correcta y otra incorrecta.

## Entidades

-   User:

    -   id
    -   name
    -   avatar
    -   email
    -   password

-   Language:

    -   id
    -   name

-   Level:

    -   id
    -   name (fácil, medio, difícil)

-   Card:
    -   id
    -   question
    -   answer
    -   true_answer
    -   false_anwser

-   Deck:

    -   id
    -   name

-   User_Card

    -   id
    -   is_correct
    -   is_favourite

-   User_Card_Deck 
    -id

## Endpoints

-   **POST /user** Registro de usuario ✅
-   **GET /user/:id** Devuelve información de usuario ✅
-   **PUT /user/edit** Modifica el nombre de usuario y el email de un usuario autentificado ✅
-   **PUT /user/edit** Modifica el nombre y la descripción de un usuario autentificado ✅
-   **PUT /user/password** Modifica la contraseña de un usuario ✅
-   **DELETE /user/delete** Elimina usuario ✅
-   **POST /login** Login de usuario (devuelve token) ✅
-   **GET /:id** Devuelve la tarjeta por id ✅
-   **POST /card/language/level** Devuelve todas las tarjetas por nivel y lenguaje ✅
-   **GET /user_card/:id** Devuelve todas las tarjetas relacionadas con el usuario ✅
-   **PUT /correct/:id** Modifica la columna is_correct de una tarjeta relacionada con el usuario ✅
-   **PUT /favourite/:id** Modifica la columna is_favourite de una tarjeta relacionada con el usuario ✅
-   **GET /user_card/fail/:id** Devuelve las tarjetas incorrectas del usuario ✅
-   **GET /user_card/favourite/:id** Devuelve las tarjetas favoritas del usuario ✅
-   **GET /deck/:id** Devuelve los decks del usuario ✅
-   **PUT /deck/fails/:id** Crea los mazos de fails del usuario ✅

## Corregir controllers user separando funcionalidad db

## Añadir userAuth en getUsers by id

## user/login debe devolver un objeto con todos los datos del usuario incluido el token

## Instalación

-   Clonar el repositorio

-   Instalar dependencias

    npm install

-   Configurar variables de entorno

    cp .env.example .env

-   Ejecutar migraciones

    npm run migrations:reset

## Añadir cards en tu MySQL

-   Abre MySQL

-   Añade un query tab

-   Inserta:

-   create database benkyo

-   use benkyo

-   copia las tablas del archivo initDB.js

-   copia el insertLanguage.sql

-   copia insertLevel.sql

-   copia insertCards.sql

-   ejecuta toda la query
