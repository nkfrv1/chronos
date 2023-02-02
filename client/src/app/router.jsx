import { createBrowserRouter } from "react-router-dom";
import Layout from "../features/layout/Layout";
import Home from "../features/home/Home";
import Error from "../features/error/Error";
import Login from "../features/login/Login";
import Signup from "../features/signup/Signup";
import PasswordReset from "../features/password-reset/PasswordReset";
import { handleLogin } from "../features/login/loginThunk";
import { handleSignup } from "../features/signup/signupThunk";
import { handleLogout } from "../features/logout/logoutThunk";
import { loadHomepage } from "../features/home/homeThunk";
import { handleReset } from "../features/password-reset/resetThunk";

const routes = [
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
                loader: loadHomepage
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
        ]
    }
];

const appRouter = createBrowserRouter(routes);

export default appRouter;