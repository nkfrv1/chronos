import { createBrowserRouter } from "react-router-dom";
import { Counter } from "../features/counter/Counter";
import Error from "../features/error/Error";
import Login from "../features/login/Login";
import Signup from "../features/signup/Signup";
import PasswordReset from "../features/password-reset/PasswordReset";
import { handleSignup } from "../features/signup/signupThunk";
import { handleLogin } from "../features/login/loginThunk";
import { handleLogout } from "../features/logout/logoutThunk";
import { handleReset } from "../features/password-reset/resetThunk";


const routes = [
    {
        path: '/',
        errorElement: <Error />
    },
    {
        path: '/signup',
        element: <Signup />,
        action: handleSignup
    },
    {
        path: '/login',
        element: <Login />,
        action: handleLogin
    },
    {
        path: '/logout',
        loader: handleLogout
    },
    {
        path: '/password-reset',
        element: <PasswordReset />,
        action: handleReset
    },
    {
        path: '/password-reset/:token',
        element: <PasswordReset />,
        action: handleReset,
    },
    {
        path: '/counter',
        element: <Counter />
    },
]

const appRouter = createBrowserRouter(routes);

export default appRouter;