import { redirect } from "react-router-dom";
import { store } from "../../app/store"

export function checkUnauthorized() {
    const { auth } = store.getState();
    if (!auth.isAuth) {
        return redirect('/login');
    }
    return null;
}
