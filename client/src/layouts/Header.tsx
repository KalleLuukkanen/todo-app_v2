import { Link } from "react-router-dom";
import { useState } from "react";
import Menu from "./Menu";
import TodoForm from "../features/todos/TodoForm"


function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <header className="flex items-center p-4 bg-blue-300 relative">
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
                            className="underline hover:text-blue-800"
                        >
                            Todos
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="underline hover:text-blue-800">
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="flex items-center space-x-4 ml-auto mr-2">
                <input type="text" className="border-1 border-black p-2 rounded" placeholder="🔍 Search"></input>
                <button className="cursor-pointer border-1 border-black p-2 rounded" onClick={() => setIsFormOpen(true)}>Add a new todo ➕</button>
                <button className="cursor-pointer text-3xl" onClick={() => setIsMenuOpen(prev => !prev)}>≡</button>
            </div>
            {isMenuOpen &&
                <Menu />
            }
            {isFormOpen &&
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
                    onClick={() => setIsFormOpen(false)}
                >
                    <TodoForm onClose={() => setIsFormOpen(false)} />
                </div>}

        </header>
    )
}

export default Header