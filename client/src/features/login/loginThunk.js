import { redirect } from "react-router-dom";
import AuthService from "../../api/AuthService";
import { login } from "../../app/authSlice";
import { store } from "../../app/store";

export async function checkAuth() {
    try {
        const response = await AuthService.refreshToken();
        localStorage.setItem('token', response.data.tokens.accessToken);
        store.dispatch(login(response.data.user));
    } catch (error) {
        console.error(`Auth Check Error: ${error.response.data}`);
    }
}

export async function handleLogin({ request }) {
    try { 
        const formData = await request.formData();
        const credentials = Object.fromEntries(formData);
        const response = await AuthService.login(credentials);
        localStorage.setItem('token', response.data.tokens.accessToken);
        store.dispatch(login(response.data.user));
        return redirect('/');
    } catch (e) {
        const responseData = e.response.data;
        return Object.hasOwn(responseData, 'errors') ? responseData.errors : responseData;
    }
}
