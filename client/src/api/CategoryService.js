import $api from ".";

class CategoryService {
    static async create({ name }) {
        try {
            const { data } = await $api.post('/categories', { name });
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async getAll() {
        try {
            const { data } = await $api.get('/categories');
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async getOne(id) {
        try {
            const { data } = await $api.get(`/categories/${id}`);
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async getEvents(id) {
        try {
            const { data } = await $api.get(`/categories/${id}/events`);
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async update(id, { name }) {
        try {
            const { data } = await $api.patch(`/categories/${id}`, { name });
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async delete(id) {
        try {
            const { data } = await $api.delete(`/categories/${id}`);
            return data;
        } catch (e) {
            throw e;
        }
    }
}

export default CategoryService;