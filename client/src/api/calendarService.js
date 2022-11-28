import $api from ".";

class CalendarService {
    static async create({ name, description, author, main }) {
        try {
            const { data } = await $api.post('/calendars', { name, description, author, main });
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async getAll() {
        try {
            const { data } = await $api.get('/calendars');
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async getOne() {
        try {
            const { data } = await $api.get('/calendars/:id');
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async getEvents() {
        try {
            const { data } = await $api.get('/calendars/:id/events');
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async update({ name, description, author, hidden }) {
        try {
            const { data } = await $api.patch('/calendars/:id', { name, description, author, hidden });
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async delete() {
        try {
            const { data } = await $api.delete('/calendars/:id');
            return data;
        } catch (e) {
            throw e;
        }
    }
}

export default CalendarService;