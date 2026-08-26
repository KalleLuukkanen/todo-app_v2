import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import * as todosApi from "../api/todosApi.ts";

export type TodoType = {
    id: number;
    name: string;
    description: string | null;
    category_id: number | null;
    deadline: string | null;
    done: boolean;
    created_at: string;
};

type TodosContextValue = {
    todos: TodoType[];
    createTodo: (todo: { name: string; description: string | null; category_id: number | null; deadline: string | null }) => Promise<void>;
    removeTodo: (todo_id: number) => Promise<void>;
    removeAll: () => Promise<void>;
    todoDone: (todo_id: number, done: boolean) => Promise<void>;
    modify: (id: number, todo: { name: string; description: string | null; category_id: number | null; deadline: string | null; done: boolean | null }) => Promise<void>;
};

const TodosContext = createContext<TodosContextValue | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        todosApi.getAll().then(setTodos);
    }, []);

    const createTodo: TodosContextValue["createTodo"] = async (todo) => {
        const created = await todosApi.create(todo);
        setTodos((prev) => [...prev, created]);
    };

    const removeTodo: TodosContextValue["removeTodo"] = async (todoId) => {
        const removed = await todosApi.remove(todoId);
        setTodos((prev) => prev.filter((t) => t.id !== removed.id));
    };

    const removeAll: TodosContextValue["removeAll"] = async () => {
        await todosApi.removeAll();
        setTodos([]);
    };

    const todoDone: TodosContextValue["todoDone"] = async (todo_id, done) => {
        const updated = await todosApi.completeOrUncomplete(todo_id, done);
        setTodos((prev) => prev.map((t) => (t.id === todo_id ? updated : t)));
    };

    const modify: TodosContextValue["modify"] = async (id, todo) => {
        const updated = await todosApi.modify(todo, id);
        setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    };

    return (
        <TodosContext.Provider value={{ todos, createTodo, removeTodo, removeAll, todoDone, modify }}>
            {children}
        </TodosContext.Provider>
    );
}

export function useTodos() {
    const ctx = useContext(TodosContext);
    if (!ctx) throw new Error("useTodos must be used within TodosProvider");
    return ctx;
}