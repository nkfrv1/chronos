import { redirect } from "react-router-dom";
import AuthService from "../../api/AuthService";
import { logout } from "../../app/authSlice";
import { store } from "../../app/store";

export async function handleLogout() {
    try {
        // const { auth } = store.getState();
        // if (!auth.isAuth) {
        //     return redirect('/login');
        // }
        await AuthService.logout();
        localStorage.removeItem('token');
        store.dispatch(logout());
    } catch (error) {
        console.error(`Logout Error: ${error.response?.data}`);
    } finally {
        return redirect('/login');
    }
}
