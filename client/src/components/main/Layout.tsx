import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useUserState } from "../../states/AuthContext";


function Layout() {
    const { userState } = useUserState();
    return (
        <div className="flex flex-col min-h-screen">
            {userState.email && <Header />}
            <main className="flex-1 p-4 bg-gray-100">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;