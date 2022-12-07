import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default Layout;