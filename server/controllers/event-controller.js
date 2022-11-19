const eventService = require('../services/event-service');

class EventController {
    async createEvent(req, res, next) {
        try {
            const { name, start, end, category, calendar } = req.body;
            const data = await eventService.create(name, start, end, category, calendar);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getEvents(req, res, next) {
        try {
            const data = await eventService.getAll();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getSpecificEvent(req, res, next) {
        try {
            const requestedId = req.params.id;
            const data = await eventService.getOne(requestedId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async updateEvent(req, res, next) {
        try {
            const requestedId = req.params.id;
            const { name, start, end, category, calendar } = req.body;
            const data = await eventService.update(requestedId, name, start, end, category, calendar);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async deleteEvent(req, res, next) {
        try {
            const requestedId = req.params.id;
            const data = await eventService.delete(requestedId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new EventController();