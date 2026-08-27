import { Link } from "react-router-dom";
import { useState } from "react";
import Menu from "./Menu";
import TodoForm from "../features/todos/TodoForm"
import Search from "./Search";
import { useTodos } from "../context/TodosContext";
import { searchTodos } from "../utils/helpers";
import type { TodoType } from "../context/TodosContext";


function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const { todos } = useTodos();

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [searchedTodos, setSearchedTodos] = useState<TodoType[]>([]);

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
                <input
                    type="search"
                    value={searchWord}
                    className="border-1 border-black p-2 rounded"
                    placeholder="🔍 Search"
                    onChange={(e) => {
                        if (e.target.value === "") {
                            setIsSearchOpen(false);
                        } else {

                            setIsSearchOpen(true);
                        }
                        setSearchWord(e.target.value);
                        setSearchedTodos(searchTodos(todos, e.target.value));
                    }}
                >
                </input>
                <button
                    className="cursor-pointer border-1 border-black p-2 rounded"
                    onClick={() => setIsFormOpen(true)}>
                    Add a new todo ➕
                </button>
                <button
                    className="cursor-pointer text-3xl"
                    onClick={() => setIsMenuOpen(prev => !prev)}>
                    ≡
                </button>
            </div>
            {isMenuOpen &&
                <Menu onClose={() => setIsMenuOpen(false)} />
            }
            {isSearchOpen &&
                <Search todoList={searchedTodos} onClose={() => {
                    setSearchWord("");
                    setIsSearchOpen(false);
                }} />
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