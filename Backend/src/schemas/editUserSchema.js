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

const newPasswordSchema = Joi.string()
    .required()
    .min(8)
    .max(30)
    .regex(/[A-Za-z\d@$!%*?&]/)
    .error((errors) => {
        if (
            errors[0].code === 'any.required' ||
            errors[0].code === 'string.empty'
        ) {
            return new Error('La contraseña es requerida');
        } else {
            return new Error('La contraseña debe contener al menos una letra mayúscula, otra minúscula, un número, un caracter especial, y una longitud entre 8 y 30 caracteres');
        }
    });

module.exports = {
    newNameSchema,
    newStacknSchema,
    newUsernameSchema,
    newEmailSchema,
    newPasswordSchema
};