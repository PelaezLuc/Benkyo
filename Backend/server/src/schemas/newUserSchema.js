const Joi = require('joi');

const newUserSchema = Joi.object().keys({
    name: Joi.string()
        .required()
        .min(3)
        .max(30)
        .regex(/[a-zA-Z]/)
        .error((errors) => {
            if (
                errors[0].code === 'any.required' || 
                errors[0].code === 'string.empty'
            ) {
                return new Error('El nombre es requerido');
            } else {
                return new Error('El nombre debe tener entre 3 y 30 caracteres');
            }
        }),
        
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
                return new Error('El nombre de usuario es requerido');
            } else {
                return new Error('El nombre debe tener entre 3 y 30 caracteres');
            }
    }),

    description: Joi.string()
        .min(10)
        .max(500)
        .error((errors) => {
            if (errors[0].code === 'string.empty') {
                return new Error(
                    'No se permite enviar una descripción vacía'
                );
            } else {
                return new Error(
                    'La descripción debe tener entre 10 y 500 caracteres'
                );
            }
    }),

    email: Joi.string()
        .email()
        .lowercase()
        .required()
        .error((errors) => {
            if (
                errors[0].code === 'any.required' || 
                errors[0].code === 'string.empty'
            ) {
                return new Error('El email es requerido');
            } else {
                return new Error('El email es incorrecto');
            }
        }),

    password: Joi.string()
        .min(8)
        .max(30)
        .regex(/[A-Za-z\d@$!%*?&]/)
        .required()
        .error((errors) => {
            if (
                errors[0].code === 'any.required' || 
                errors[0].code === 'string.empty'
            ) {
                return new Error('La contraseña es requerida');
            } else {
                return new Error('La contraseña debe contener al menos una letra mayúscula, otra minúscula, un número, un caracter especial, y una longitud entre 8 y 30 caracteres');
            }
        }),
});

module.exports = newUserSchema;