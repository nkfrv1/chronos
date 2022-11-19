const uniqueFilename = require('unique-filename');
const { hash } = require('bcrypt');
const path = require('path');
const fs = require('fs');
const User = require("../models/user");
const Calendar = require('../models/calendar');
const { ApiError } = require('../exceptions/api-error');


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

class UserService {
    async create(username, password, email, fullname, uploadedPicture) {
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
        return createdUser;
    }

    async getAll() {
        const users = await User.findAll();
        if (users.length <= 0) {
            throw ApiError.Unacceptable('No users yet');
        }
        return users;
    }

    async getOne(userId) {
        const target = await User.findByPk(userId);
        if (!target) {
            throw ApiError.NotFound('Wrong user requested');
        }
        return target;
    }

    async getCalendars(userId) {
        const target = await User.findByPk(userId);
        if (!target) {
            throw ApiError.NotFound('Wrong user requested');
        }
        const calendars = await Calendar.findAll({ where: { author: userId } });
        return calendars;
    }

    async update(userId, username, password, email, fullname, profpic, uploadedPicture) {
        const target = await User.findByPk(userId);
        if (!target) {
            throw ApiError.BadRequest('Wrong user requested');
        }
        const profilePicture = (uploadedPicture) ? await saveFile(uploadedPicture) : profpic;
        const hashedPassword = (password) ? await hash(password, 4) : undefined;
        await target.update({
            username: username,
            password: hashedPassword,
            email: email,
            fullname: fullname,
            profpic: profilePicture
        });
        return target;
    }

    async delete(userId) {
        const target = await User.findByPk(userId);
        if (!target) {
            throw ApiError.BadRequest('Wrong user requested');
        }
        await removeFile(userId);
        const result = await User.destroy({ where: { id: userId } });
        if (result === 1) {
            return 'User has been removed';
        } else {
            throw new Error();
        }
    }
}

module.exports = new UserService();