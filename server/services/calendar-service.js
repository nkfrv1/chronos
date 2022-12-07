const Calendar = require("../models/calendar");
const Event = require("../models/event");
const { ApiError } = require('../exceptions/api-error');

class CalendarService {
    async create(name, description, author, main) {
        const calendar = await Calendar.create({ name, description, author, main });
        if (!calendar) {
            throw ApiError.BadRequest('Invalid data given');
        }
        return calendar;
    }

    async getAll() {
        const calendars = await Calendar.findAll();
        if (calendars.length <= 0) {
            throw ApiError.Unacceptable('No calendars yet');
        }
        return calendars;
    }

    async getOne(calendarId) {
        const target = await Calendar.findByPk(calendarId);
        if (!target) {
            throw ApiError.NotFound('Wrong calendar requested');
        }
        return target;
    }

    async getEvents(calendarId) {
        const target = await Calendar.findByPk(calendarId);
        if (!target) {
            throw ApiError.NotFound('Wrong calendar requested');
        }
        const events = await Event.findAll({ where: { calendar: calendarId } });
        if (events.length <= 0) {
            throw ApiError.Unacceptable('No events in this calendar yet');
        }
        return events;
    }

    async update(calendarId, name, description, author, hidden) {
        const target = await Calendar.findByPk(calendarId);
        if (!target) {
            throw ApiError.BadRequest('Wrong calendar requested');
        }
        await target.update({ name, description, author, hidden });
        return target;
    }

    async delete(calendarId) {
        const target = await Calendar.findByPk(calendarId);
        if (!target) {
            throw ApiError.BadRequest('Wrong calendar requested');
        }
        const result = await Calendar.destroy({ where: { id: calendarId } });
        if (result === 1) {
            return 'Calendar has been removed';
        } else {
            throw new Error();
        }
    }
}

module.exports = new CalendarService();