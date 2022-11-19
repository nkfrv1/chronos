const categoryService = require('../services/category-service');

class CategoryController {
    async createCategory(req, res, next) {
        try {
            const { name } = req.body;
            const data = await categoryService.create(name);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getCategories(req, res, next) {
        try {
            const data = await categoryService.getAll();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getSpecificCategory(req, res, next) {
        try {
            const requestedId = req.params.id;
            const data = await categoryService.getOne(requestedId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getCategoryEvents(req, res, next) {
        try {
            const requestedId = req.params.id;
            const data = await categoryService.getEvents(requestedId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req, res, next) {
        try {
            const requestedId = req.params.id;
            const { name } = req.body;
            const data = await categoryService.update(requestedId, name);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const requestedId = req.params.id;
            const data = await categoryService.delete(requestedId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();