import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="flex items-center p-4 bg-blue-100">
            <nav className="ml-2">
                <ul className="flex items-center space-x-4">
                    <li>
                        <Link
                            to="/"
                            className="text-2xl"
                        >
                            TodoApp
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/todos"
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            Todos
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="text-blue-600 underline hover:text-blue-800">
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
            <Link
                to="/user"
                className="ml-auto mr-2">
                👤
            </Link>
        </header>
    )
}

export default Header