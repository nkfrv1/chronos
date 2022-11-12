const { validationResult } = require('express-validator');
const uniqueFilename = require('unique-filename');
const { hash } = require('bcrypt');
const path = require('path');
const fs = require('fs');
const { ApiError, formatValidationError } = require('../exceptions/api-error');
const User = require('../models/user');


const saveFile = async (file) => {
    const name = (file.name.split('.'))[0];
    const uniqueName = uniqueFilename('', name) + '.png';
    const filePath = path.resolve('.', 'static', uniqueName);
    await file.mv(filePath);
    return uniqueName;
}

const removeFile = async (id) => {
    const user = await User.findByPk(id);
    if (user.profpic) {
        const picture = user.profpic;
        fs.unlink(path.resolve('.', 'static', picture), (error) => {
            if (error) {
                console.error(error.message);
            }
        });
    }
}

class UserController {
    async createUser(req, res, next) {
        try {
            const errors = validationResult(req).formatWith(formatValidationError);
            if (!errors.isEmpty()) {
                throw ApiError.ValidationError({ errors: errors.array() });
            }
            const { username, password, email, fullname } = req.body;
            const uploadedPicture = req.files?.profpic;
            const profpic = (uploadedPicture) ? await saveFile(uploadedPicture) : undefined;
            const hashedPassword = (password) ? await hash(password, 4) : undefined;
            const createdUser = await User.create({
                username: username,
                password: hashedPassword,
                email: email,
                fullname: fullname,
                profpic: profpic
            });
            if (!createdUser) {
                throw ApiError.BadRequest('Invalid data given');
            }
            res.json(createdUser);
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req, res) {
        const users = await User.findAll();
        if (users.length <= 0) {
            return res.status(406).json('No users yet');
        }
        res.json(users);
    }

    async getSpecificUser(req, res) {
        const requestedId = req.params.id;
        const target = await User.findByPk(requestedId);
        if (!target) {
            return res.status(404).json('Wrong user requested');
        }
        res.json(target);
    }

    async updateUser(req, res, next) {
        try {
            const requestedId = req.params.id;
            const target = await User.findByPk(requestedId);
            if (!target) {
                throw ApiError.BadRequest('Wrong user requested');
            }
            const { username, password, email, fullname, profpic } = req.body;
            const uploadedPicture = req.files?.profpic;
            const profilePicture = (uploadedPicture) ? await saveFile(uploadedPicture) : profpic;
            const hashedPassword = (password) ? await hash(password, 4) : undefined;
            await target.update({
                username: username,
                password: hashedPassword,
                email: email,
                fullname: fullname,
                profpic: profilePicture
            });
            res.json(target);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const requestedId = req.params.id;
            const target = await User.findByPk(requestedId);
            if (!target) {
                throw ApiError.BadRequest('Wrong user requested');
            }
            await removeFile(requestedId);
            const result = await User.destroy({ where: { id: requestedId } });
            if (result === 1) {
                res.json('User has been removed');
            } else {
                next(e);
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();