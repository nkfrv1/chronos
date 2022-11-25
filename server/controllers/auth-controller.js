const { validationResult } = require('express-validator');
const authService = require('../services/auth-service');
const { ApiError, formatValidationError } = require('../exceptions/api-error');


class AuthController {
    userRequestedReset;

    async register(req, res, next) {
        try {
            const errors = validationResult(req).formatWith(formatValidationError);
            if (!errors.isEmpty()) {
                throw ApiError.ValidationError({ errors: errors.array() });
            }
            const { username, password, confirmation, email } = req.body;
            const data = await authService.register(username, password, confirmation, email);
            res.cookie('refreshToken', data.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req).formatWith(formatValidationError);
            if (!errors.isEmpty()) {
                throw ApiError.ValidationError({ errors: errors.array() });
            }
            const { username, password } = req.body;
            const data = await authService.login(username, password);
            res.cookie('refreshToken', data.tokens.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const data = await authService.refresh(refreshToken);
            res.cookie('refreshToken', data.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
    
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const data = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    resetPassword = async (req, res, next) => {
        try {
            const errors = validationResult(req).formatWith(formatValidationError);
            if (!errors.isEmpty()) {
                throw ApiError.ValidationError({ errors: errors.array() });
            }
            const { email } = req.body;
            const { data, user } = await authService.resetPassword(email);
            this.userRequestedReset = user;
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    confirmReset = async (req, res, next) => {
        try {
            if (!this.userRequestedReset) {
                throw ApiError.Forbidden('You haven\'t required access');
            }
            const errors = validationResult(req).formatWith(formatValidationError);
            if (!errors.isEmpty()) {
                throw ApiError.ValidationError({ errors: errors.array() });
            }
            const confirmToken = req.params.token;
            const { new_password } = req.body;
            const { data, user } = await authService.confirmReset(confirmToken, new_password);
            this.userRequestedReset = user;
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();