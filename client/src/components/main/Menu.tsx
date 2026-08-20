import { Link } from "react-router-dom";

function Menu() {
    return (
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
            </div>
        </nav>
    )
}

export default Menu;