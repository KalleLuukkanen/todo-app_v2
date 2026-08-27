import { Link } from "react-router-dom";
import { useUserState } from "../context/AuthContext";

function Menu({ onClose }: { onClose: () => void }) {
    const { logout } = useUserState();
    return (
        <>
            <div className="fixed inset-0 z-40" onClick={() => onClose()} />
            <nav className="absolute right-0 top-full z-50 w-64 rounded-bl-lg rounded-br-lg bg-gray-200 p-4 shadow-xl">
                <div className="flex flex-col gap-2">
                    <Link
                        to="/user"
                        className="hover:text-blue-800">
                        User 👤
                    </Link>
                    <Link
                        to="/settings"
                        className="hover:text-blue-800">
                        Settings ⚙️
                    </Link>
                    <span className="border-1 border-gray-300 my-2"></span>
                    <button onClick={logout} className="bg-red-200 w-32 mx-auto rounded cursor-pointer">Log out</button>
                </div>
            </nav>
        </>


    )
}

export default Menu;