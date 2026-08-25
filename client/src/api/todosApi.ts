const BASE_URL = `${import.meta.env.VITE_API_URL}/api/todos`;

type TodoData = {
    name: string;
    description: string | null;
    category_id: number | null;
    deadline: string | null;
    done: boolean | null;
};

type TodoInput = Omit<TodoData, "done">;

const getAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
    });
    return await response.json();
};

const getOne = async (todoId: number) => {
    const response = await fetch(`${BASE_URL}/${todoId}`, {
        credentials: "include",
    });
    return await response.json();
};

const create = async (todo: TodoInput) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
    });
    return await response.json();
};

const removeAll = async () => {
    const response = await fetch(BASE_URL, {
        method: "DELETE",
        credentials: "include",
    });
    return await response.json();
};

const remove = async (todoId: number) => {
    const response = await fetch(`${BASE_URL}/${todoId}`, {
        method: "DELETE",
        credentials: "include",
    });
    return await response.json();
};

const modify = async (todo: TodoData, todoId: number) => {
    const response = await fetch(`${BASE_URL}/${todoId}/modify`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
    });
    return await response.json();
};

const completeOrUncomplete = async (todoId: number, done: boolean) => {
    const response = await fetch(`${BASE_URL}/${todoId}/done`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done }),
    });
    return await response.json();
};

export { getAll, getOne, create, removeAll, remove, modify, completeOrUncomplete };