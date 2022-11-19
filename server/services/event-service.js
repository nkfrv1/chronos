const Event = require("../models/event");
const { ApiError } = require('../exceptions/api-error');

class EventService {
    async create(name, start, end, category, calendar) {
        const event = await Event.create({ name, start, end, category, calendar });
        if (!event) {
            throw ApiError.BadRequest('Invalid data given');
        }
        return event;
    }

    async getAll() {
        const events = await Event.findAll();
        if (events.length <= 0) {
            throw ApiError.Unacceptable('No events yet');
        }
        return events;
    }

    async getOne(eventId) {
        const target = await Event.findByPk(eventId);
        if (!target) {
            throw ApiError.NotFound('Wrong event requested');
        }
        return target;
    }

    async update(eventId, name, start, end, category, calendar) {
        const target = await Event.findByPk(eventId);
        if (!target) {
            throw ApiError.BadRequest('Wrong event requested');
        }
        await target.update({ name, start, end, category, calendar });
        return target;
    }

    async delete(eventId) {
        const target = await Event.findByPk(eventId);
        if (!target) {
            throw ApiError.BadRequest('Wrong event requested');
        }
        const result = await Event.destroy({ where: { id: eventId } });
        if (result === 1) {
            return 'Event has been removed';
        } else {
            throw new Error();
        }
    }
}

module.exports = new EventService();