import { redirect } from "react-router-dom";

export async function handleRedirect() {
    try {
        // todo
        return redirect('/dashboard');
    } catch (error) {
        console.error(`Redirect to dashboard error: ${error.response.data}`);
    }
}
