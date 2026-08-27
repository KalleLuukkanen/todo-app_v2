import type { TodoType } from "../context/TodosContext";
import TodoModify from "../features/todos/TodoModify";
import { useState } from "react";


function Search({ todoList, onClose }: { todoList: TodoType[], onClose: () => void }) {
    const [expanded, setExpanded] = useState(false);
    const [todoId, setTodoId] = useState(0);

    if (!expanded) {
        return (
            <>
                <div className="fixed inset-0 z-40" onClick={() => onClose()} />
                <ul className="absolute right-0 top-full z-50 w-64 rounded-bl-lg rounded-br-lg bg-gray-200 p-4 shadow-xl space-y-2"
                    onClick={() => onClose()}
                >
                    {todoList.length === 0 && <li>No todos contain that word.</li>}
                    {todoList.map((t) => (
                        <li key={t.id} className="rounded p-2 border border-gray-300">
                            <button className="text-lg underline cursor-pointer"
                                onClick={() => {
                                    setExpanded(true);
                                    setTodoId(t.id)
                                }}
                            >
                                {t.name}
                            </button>
                            <p>{t.description}</p>
                        </li>
                    ))}
                </ul>
            </>

        )
    } else {
        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
                onClick={() => setExpanded(false)}>
                <TodoModify id={todoId} onClose={() => setExpanded(false)} />
            </div>
        )

    }

}

export default Search;