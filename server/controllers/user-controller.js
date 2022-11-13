const userService = require('../services/user-service');

class UserController {
    async createUser(req, res, next) {
        try {
            const { username, password, email, fullname } = req.body;
            const uploadedPicture = req.files?.profpic;
            const data = await userService.create(username, password, email, fullname, uploadedPicture);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req, res, next) {
        try {
            const data = await userService.getAll();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getSpecificUser(req, res, next) {
        try {
            const requestedId = req.params.id;
            const data = await userService.getSpecific(requestedId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const requestedId = req.params.id;
            const { username, password, email, fullname, profpic } = req.body;
            const uploadedPicture = req.files?.profpic;
            const data = await userService.update(requestedId, username, password, email, fullname, profpic, uploadedPicture);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const requestedId = req.params.id;
            const data = await userService.delete(requestedId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();