import { redirect } from "react-router-dom";
import AuthService from "../../api/authService";

export async function handleSignup({ request }) {
    try { 
        const formData = await request.formData();
        const credentials = Object.fromEntries(formData);
        await AuthService.register(credentials);
        return redirect('/login');
    } catch (e) {
        const responseData = e.response.data;
        return Object.hasOwn(responseData, 'errors') ? responseData.errors : responseData;
    }
}
