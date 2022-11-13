const { hash, compare } = require('bcrypt');
const { randomUUID } = require('crypto');
const { Op } = require('sequelize');
const User = require("../models/user");
const mailService = require("./mail-service");
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
        return user;
    }

    login = async (username, password) => {
        const user = await User.findOne({ where: { username: username } });
        if (!user || await compare(password, user.password) === false) {
            throw ApiError.BadRequest('Invalid credentials were given');
        }
        return user;
    }

    logout = async () => {

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