import $api from ".";

class UserService {
    static async create({ username, password, email, fullname, profpic }) {
        try {
            const { data } = await $api.post('/users', { username, password, email, fullname, profpic });
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async getAll() {
        try {
            const { data } = await $api.get('/users');
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async getOne(id) {
        try {
            const { data } = await $api.get(`/users/${id}`);
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async getCalendars(id) {
        try {
            const { data } = await $api.get(`/users/${id}/calendars`);
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async update(id, { username, password, email, fullname, profpic }) {
        try {
            const { data } = await $api.patch(`/users/${id}`, { username, password, email, fullname, profpic });
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async delete(id) {
        try {
            const { data } = await $api.delete(`/users/${id}`);
            return data;
        } catch (e) {
            throw e;
        }
    }
}

export default UserService;