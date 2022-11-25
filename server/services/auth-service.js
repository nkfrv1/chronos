const { hash, compare } = require('bcrypt');
const { randomUUID } = require('crypto');
const { Op } = require('sequelize');
const User = require("../models/user");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const { ApiError } = require("../exceptions/api-error");


class AuthService {
    userRequestedReset;

    register = async (username, password, confirmation, email) => {
        const existingUser = await User.findOne({ where: { [Op.or]: [{ username: username }, { email: email }] } });
        if (existingUser) {
            throw ApiError.BadRequest('User with given credentials already exists');
        }
        if (password !== confirmation) {
            throw ApiError.BadRequest('Passwords don\'t match');
        }
        const hashedPassword = await hash(password, 4);
        const user = await User.create({
            username: username,
            password: hashedPassword,
            email: email
        });
        // const link = randomUUID();
        // await mailService.sendActivationLink(user.email, link);
        const tokens = tokenService.generateTokens({ id: user.id, username: user.username });
        await tokenService.saveTokens(user.id, tokens.refreshToken);
        return tokens;
    }

    login = async (username, password) => {
        const user = await User.findOne({ where: { username: username } });
        if (!user || await compare(password, user.password) === false) {
            throw ApiError.BadRequest('Invalid credentials were given');
        }
        const tokens = tokenService.generateTokens({ id: user.id, username: user.username });
        await tokenService.saveTokens(user.id, tokens.refreshToken);
        return {
            tokens,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                fullname: user.fullname
            }
        };
    }

    refresh = async (refreshToken) => {
        if (!refreshToken) {
            throw ApiError.Unauthorized();
        }
        const tokenPayload = tokenService.verifyRefreshToken(refreshToken);
        const foundToken = await tokenService.findRefreshToken(refreshToken);
        if (!tokenPayload || !foundToken) {
            throw ApiError.Unauthorized();
        }
        const user = await User.findByPk(tokenPayload.id);
        const tokens = tokenService.generateTokens({ id: user.id, username: user.username });
        await tokenService.saveTokens(user.id, tokens.refreshToken);
        return tokens;
    }
    
    logout = async (refreshToken) => {
        if (!refreshToken) {
            throw ApiError.Unauthorized(`You aren't logged in yet`);
        }
        const result = await tokenService.removeToken(refreshToken);
        if (result !== 1) {
            throw new Error();
        }
        return 'Logged Out';
    }

    resetPassword = async (email) => {
        const target = await User.findOne({ where: { email: email } });
        if (!target) {
            throw ApiError.BadRequest('Invalid email was given');
        }
        const confirmToken = randomUUID();
        this.userRequestedReset = {
            userId: target.id,
            token: confirmToken
        };
        await mailService.sendResetLink(email, confirmToken);
        // kinda a little crutch :)
        return { data: 'Password reset link has been sent to your email', user: this.userRequestedReset };
    }

    confirmReset = async (confirmToken, newPassword) => {
        if (confirmToken !== this.userRequestedReset.token) {
            throw ApiError.BadRequest('Token specified in link doesn\'t match the sent token');
        }
        const hashedPassword = await hash(newPassword, 4);
        await User.update({
            password: hashedPassword
        }, { where: { id: this.userRequestedReset.userId } });
        this.userRequestedReset = undefined;
        return { data: 'Your password has been changed', user: this.userRequestedReset };
    }
}

module.exports = new AuthService();