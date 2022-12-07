import axios from "axios";
import AuthService from "./AuthService";

const $api = axios.create({
    withCredentials: true,
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
});

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const initialRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config.isRetry) {
            initialRequest.isRetry = true;
            try {
                const response = await AuthService.refreshToken();
                localStorage.setItem('token', response.data.accessToken);
                return $api.request(initialRequest);
            } catch (e) {
                console.error(`Token Refresh Error: ${e.response.data}`);
            }
        }
        throw error;
    }
);

export default $api;
