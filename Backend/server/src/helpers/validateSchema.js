

async function validateSchema (schema, data) {
    try {
        await schema.validateAsync(data);
    } catch (error) {
        error.httpStatus = 400;
        throw error;
    }
}

module.exports = {
    validateSchema,
}