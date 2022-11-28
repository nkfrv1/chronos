import AuthService from "../../api/authService";

export async function handleReset({ request, params }) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);
    const token = params?.token;
    if (token) {
        try {
            const response = await AuthService.confirmReset(token, credentials);
            return response;
        } catch (e) {
            const responseData = e.response.data;
            return Object.hasOwn(responseData, 'errors') ? responseData.errors : responseData;
        }

    } else {
        try {
            const response = await AuthService.resetPassword(credentials);
            return response;
        } catch (e) {
            const responseData = e.response.data;
            return Object.hasOwn(responseData, 'errors') ? responseData.errors : responseData;
        }
    }
}