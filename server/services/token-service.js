const jwt = require('jsonwebtoken');
const Token = require('../models/token');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }

    async saveTokens(userId, refreshToken) {
        const existingToken = await Token.findOne({ where: { userId: userId } });
        if (existingToken) {
            return await existingToken.update({ refreshToken: refreshToken });
        }
        const token = await Token.create({
            userId: userId,
            refreshToken: refreshToken
        });
        return token;
    }

    verifyAccessToken(token) {
        try {
            const result = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return result;
        } catch (error) {
            return null;
        }
    }

    verifyRefreshToken(token) {
        try {
            const result = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return result;
        } catch (error) {
            return null;
        }
    }

    async findRefreshToken(token) {
        const existingToken = await Token.findOne({ where: { refreshToken: token } });
        return existingToken;
    }
    
    async removeToken(refreshToken) {
        const result = await Token.destroy({ where: { refreshToken: refreshToken } });
        return result;
    }
}

module.exports = new TokenService();