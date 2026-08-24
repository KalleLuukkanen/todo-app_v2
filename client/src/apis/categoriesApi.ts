const BASE_URL = `${import.meta.env.VITE_API_URL}/api/categories`;

const getAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
    });
    return await response.json();
};

const getOne = async (categoryId: number) => {
    const response = await fetch(`${BASE_URL}/${categoryId}`, {
        credentials: "include",
    });
    return await response.json();
};

const create = async (name: string) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
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

const remove = async (categoryId: number) => {
    const response = await fetch(`${BASE_URL}/${categoryId}`, {
        method: "DELETE",
        credentials: "include",
    });
    return await response.json();
};

const modify = async (categoryId: number, name: string) => {
    const response = await fetch(`${BASE_URL}/${categoryId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    return await response.json();
};

export { getAll, getOne, create, removeAll, remove, modify };