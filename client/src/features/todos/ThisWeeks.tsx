import type { TodoType } from "../../context/TodosContext";
import Todo from "./Todo";

function ThisWeeks({ todoList }: { todoList: TodoType[] }) {
    if (todoList.length === 0) return <p className="p-4 text-3xl">No todos due this week</p>
    return (
        <ul className="flex flex-wrap gap-2">
            {todoList.map((t) => (
                <li key={t.id}>
                    <Todo id={t.id} />
                </li>
            ))}
        </ul>
    )
}

export default ThisWeeks;