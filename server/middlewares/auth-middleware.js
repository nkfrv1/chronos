const { ApiError } = require('../exceptions/api-error');
const tokenService = require('../services/token-service');

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization        
        if (!authHeader) {
            return next(ApiError.Unauthorized());
        }
        const accessToken = authHeader.split(' ')[1];
        const tokenPayload = tokenService.verifyAccessToken(accessToken);
        if (!tokenPayload) {
            return next(ApiError.Unauthorized());
        }
        req.user = tokenPayload;
        next();
    } catch (error) {
        return next(ApiError.Unauthorized());
    }
}