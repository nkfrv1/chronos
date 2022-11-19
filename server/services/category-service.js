const Category = require("../models/category");
const Event = require("../models/event");
const { ApiError } = require('../exceptions/api-error');

class CategoryService {
    async create(name) {
        const category = await Category.create({ name });
        if (!category) {
            throw ApiError.BadRequest('Invalid data given');
        }
        return category;
    }

    async getAll() {
        const categories = await Category.findAll();
        if (categories.length <= 0) {
            throw ApiError.Unacceptable('No categories yet');
        }
        return categories;
    }

    async getOne(categoryId) {
        const target = await Category.findByPk(categoryId);
        if (!target) {
            throw ApiError.NotFound('Wrong category requested');
        }
        return target;
    }

    async getEvents(categoryId) {
        const target = await Category.findByPk(categoryId);
        if (!target) {
            throw ApiError.NotFound('Wrong category requested');
        }
        const events = await Event.findAll({ where: { category: categoryId } });
        if (events.length <= 0) {
            throw ApiError.Unacceptable('No events under this category yet');
        }
        return events;
    }

    async update(categoryId, name) {
        const target = await Category.findByPk(categoryId);
        if (!target) {
            throw ApiError.BadRequest('Wrong category requested');
        }
        await target.update({ name });
        return target;
    }

    async delete(categoryId) {
        const target = await Category.findByPk(categoryId);
        if (!target) {
            throw ApiError.BadRequest('Wrong category requested');
        }
        const result = await Category.destroy({ where: { id: categoryId } });
        if (result === 1) {
            return 'Category has been removed';
        } else {
            throw new Error();
        }
    }
}

module.exports = new CategoryService();