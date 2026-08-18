import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="flex flex-col h-full">
            <Header />
            <main className="p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;