import { useTodos } from "../../context/TodosContext";
import { useState } from "react";
import TodoModify from "./TodoModify";

function Todo({ id }: { id: number }) {
    const [expanded, setExpanded] = useState(false);

    const { todos, todoDone } = useTodos();
    const todo = todos.find((t) => t.id === id);
    if (!todo) return null;



    if (!expanded) {
        return (
            <div className="w-fit min-w-60 rounded border border-gray-300 p-2 shadow-md space-y-4">
                <button className="text-2xl cursor-pointer" onClick={() => setExpanded(true)}>{todo.name}</button>
                {todo.deadline && <p>Due {new Date(todo.deadline).toLocaleString("fi-FI")}</p>}
                <div className="flex">
                    {todo.done ? <p>Done!</p> : <button
                        className="cursor-pointer bg-green-100 rounded border p-2 ml-auto"
                        onClick={() => todoDone(id, true)}>
                        Done</button>}
                </div>

            </div>
        )
    } else {
        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
                onClick={() => setExpanded(false)}
            ><TodoModify id={todo.id} onClose={() => setExpanded(false)} /></div>

        )
    }

}

export default Todo;