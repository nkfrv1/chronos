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

    static ValidationError(errors) {
        return new ApiError(400, 'Validation Error', errors);
    }

    static BadRequest(message) {
        return new ApiError(400, message);
    }

    static Unauthorized(message) {
        return new ApiError(401, message || 'Unauthorized');
    }

    static Forbidden(message) {
        return new ApiError(403, message);
    }

    static NotFound(message) {
        return new ApiError(404, message);
    }

    static Unacceptable(message) {
        return new ApiError(406, message); 
    }
}

module.exports = { ApiError, formatValidationError };