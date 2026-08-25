import { useTodos } from "../../context/TodosContext";
import Todo from "./Todo";

function AllTodos() {
    const { todos } = useTodos();
    return (
        <ul className="flex flex-wrap gap-2">
            {todos.map((t) => (
                <li>
                    <Todo id={t.id} />
                </li>
            ))}
        </ul>

    )
}

export default AllTodos;