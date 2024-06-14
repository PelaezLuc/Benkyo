const Joi = require('joi');

const newNameSchema = Joi.string()
    .min(4)
    .max(30)
    .regex(/[a-zA-Z-]/)
    .error(new Error('El nombre de usuario debe tener entre 3 y 30 caracteres y contener solo letras'));

const newStacknSchema = Joi.string()
    .min(10)
    .max(30)
    .regex(/[a-zA-Z-]/)
    .error(new Error('La descripción debe tener entre 10 y 30 caracteres'));

const newUsernameSchema = Joi.string()
    .min(3)
    .max(30)
    .regex(/[A-Za-z0-9]/)
    .error(new Error('Tu nombre de usuario debe tener entre 3 y 30 caracteres'));

const newEmailSchema = Joi.string()
    .required()
    .email()
    .lowercase()
    .error(new Error('El email introducido no es correcto'));

module.exports = {
    newNameSchema,
    newStacknSchema,
    newUsernameSchema,
    newEmailSchema
};