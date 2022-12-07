const calendarService = require('../services/calendar-service');

class CalendarController {
    async createCalendar(req, res, next) {
        try {
            const { name, description, author, main } = req.body;
            const data = await calendarService.create(name, description, author, main);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getCalendars(req, res, next) {
        try {
            const data = await calendarService.getAll();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getSpecificCalendar(req, res, next) {
        try {
            const requestedId = req.params.id;
            const data = await calendarService.getOne(requestedId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getCalendarEvents(req, res, next) {
        try {
            const requestedId = req.params.id;
            const data = await calendarService.getEvents(requestedId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async updateCalendar(req, res, next) {
        try {
            const requestedId = req.params.id;
            const { name, description, author, hidden } = req.body;
            const data = await calendarService.update(requestedId, name, description, author, hidden);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async deleteCalendar(req, res, next) {
        try {
            const requestedId = req.params.id;
            const data = await calendarService.delete(requestedId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CalendarController();