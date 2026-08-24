import postgres from "postgres";

const sql = postgres();

const getAll = async (user_id: string) => {
    const result = await sql`
        SELECT *
        FROM todos
        WHERE user_id = ${user_id};`;
    return result;
};

const getOne = async (user_id: string, id: number) => {
    const result = await sql`
        SELECT *
        FROM todos
        WHERE id = ${id} AND user_id = ${user_id};`;
    return result[0];
};

const create = async (user_id: string, name: string, description: string | null,
    category_id: number | null, deadline: string | null) => {
    const result = await sql`
            INSERT INTO todos (user_id, name, description, category_id, deadline)
            VALUES (${user_id}, ${name}, ${description}, ${category_id}, ${deadline})
            RETURNING *;`;
    return result[0];
};

const remove = async (user_id: string, id: number) => {
    const result = await sql`
        DELETE
        FROM todos
        WHERE id = ${id} AND user_id = ${user_id}
        RETURNING *;`;
    return result[0];
};

const removeAll = async (user_id: string) => {
    const result = await sql`
        DELETE
        FROM todos
        WHERE user_id = ${user_id}
        RETURNING *;`;
    return result;
};

const modify = async (user_id: string, id: number, name: string, description: string | null,
    category_id: number | null, deadline: string | null, done: boolean | null) => {
    const result = await sql`
        UPDATE todos
        SET name = ${name}, description = ${description}, category_id = ${category_id}, deadline = ${deadline}, done = ${done}
        WHERE id = ${id} AND user_id = ${user_id}
        RETURNING *;`;
    return result[0];
};

const completeOrUncomplete = async (user_id: string, id: number, done: boolean) => {
    const result = await sql`
        UPDATE todos
        SET done = ${done}
        WHERE id = ${id} AND user_id = ${user_id}
        RETURNING *;`;
    return result[0];
}

export { getAll, getOne, create, remove, removeAll, modify, completeOrUncomplete };