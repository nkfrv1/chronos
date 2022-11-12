const { ApiError } = require('../exceptions/api-error');

module.exports = function (error, req, res, next) {
    console.log(error);
    if (error instanceof ApiError) {
        return (error.errors) ?
            res.status(error.status).json(error.errors)
            :
            res.status(error.status).json(error.message);
    }
    if (error.name === 'SequelizeValidationError') {
        const errors = [];
        error.errors.forEach((e) => {
            errors.push(e.message);
        });
        return res.status(400).json(errors);
    }
    return res.status(500).json('Unexpected error has occured');
}