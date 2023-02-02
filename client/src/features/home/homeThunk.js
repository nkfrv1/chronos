import { redirect } from "react-router-dom";
import { store } from "../../app/store"
import UserService from "../../api/UserService";

export async function loadHomepage() {
    const { auth } = store.getState();
    if (!auth.isAuth) {
        return redirect('/login');
    }
    const calendars = await UserService.getCalendars(auth.user.id);
    return calendars;
}
