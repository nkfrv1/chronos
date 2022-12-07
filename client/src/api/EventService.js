import $api from ".";

class EventService {
    static async create({ name, start, end, category, calendar }) {
        try {
            const { data } = await $api.post('/events', { name, start, end, category, calendar });
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async getAll() {
        try {
            const { data } = await $api.get('/events');
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async getOne(id) {
        try {
            const { data } = await $api.get(`/events/${id}`);
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async update(id, { name, start, end, category, calendar }) {
        try {
            const { data } = await $api.patch(`/events/${id}`, { name, start, end, category, calendar });
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async delete(id) {
        try {
            const { data } = await $api.delete(`/events/${id}`);
            return data;
        } catch (e) {
            throw e;
        }
    }
}

export default EventService;