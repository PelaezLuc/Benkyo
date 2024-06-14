const Joi = require('joi');

const newUserSchema = Joi.object().keys({
    name: Joi.string()
        .required()
        .min(4)
        .max(30)
        .regex(/[a-zA-Z-]/)
        .error((errors) => {
            if (
                errors[0].code === 'any.required' ||
                errors[0].code === 'string.empty'
            ) {
                return new Error('El nombre es requerido');
            } else {
                return new Error('El nombre debe tener entre 3 y 30 caracteres');
            }
        })

    ,

    username: Joi.string()
        .required()
        .min(3)
        .max(30)
        .regex(/[A-Za-z0-9]/)
        .error((errors) => {
            if (
                errors[0].code === 'any.required' ||
                errors[0].code === 'string.empty'
            ) {
                return new Error('Tu nombre de usuario es requerido');
            } else {
                return new Error('Tu nombre de usuario debe tener entre 3 y 30 caracteres');
            }
        })

    ,

    stack: Joi.string()
        .min(10)
        .max(30)
        .regex(/[a-zA-Z-]/)
        .error(new Error('La descripción debe tener entre 10 y 30 caracteres'))

    ,

    email: Joi.string()
        .required()
        .email()
        .lowercase()
        .error((errors) => {
            if (
                errors[0].code === 'any.required' ||
                errors[0].code === 'string.empty'
            ) {
                return new Error('El email es requerido');
            } else {
                return new Error('El email introducido no es correcto');
            }
        })

    ,

    password: Joi.string()
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
        })
});

module.exports = newUserSchema;