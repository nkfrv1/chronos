import { redirect } from "react-router-dom";
import AuthService from "../../api/authService";
import CalendarService from "../../api/calendarService";

export async function handleSignup({ request }) {
    try {
        const formData = await request.formData();
        const credentials = Object.fromEntries(formData);
        const { data } = await AuthService.register(credentials);
        await CalendarService.create({
            name: 'main',
            description: 'Default calendar',
            author: data.user.id,
            main: true
        });
        return redirect('/login');
    } catch (e) {
        const responseData = e.response.data;
        return Object.hasOwn(responseData, 'errors') ? responseData.errors : responseData;
    }
}
