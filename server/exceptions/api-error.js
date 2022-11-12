function formatValidationError({ value, msg, param, location }) {
    return `${param}: ${msg}`;
}

class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message) {
        return new ApiError(400, message);
    }

    static ValidationError(errors) {
        return new ApiError(400, 'Validation Error', errors);
    }
}

module.exports = { ApiError, formatValidationError };