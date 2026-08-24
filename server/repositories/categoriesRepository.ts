import postgres from "postgres";

const sql = postgres();

const getAll = async (user_id: string) => {
    const result = await sql`
        SELECT * 
        FROM categories
        WHERE user_id = ${user_id};`;
    return result;
};

const getOne = async (id: number, user_id: string) => {
    const result = await sql`
        SELECT *
        FROM categories
        WHERE id = ${id} AND user_id = ${user_id};`;
    return result[0];
};

const create = async (user_id: string, name: string) => {
    const result = await sql`
        INSERT INTO categories (name, user_id)
        VALUES (${name}, ${user_id})
        RETURNING *;`;
    return result[0];
};

const remove = async (id: number, user_id: string) => {
    const result = await sql`
        DELETE
        FROM categories
        WHERE id = ${id} AND user_id = ${user_id}
        RETURNING *;`;
    return result[0];
};

const removeAll = async (user_id: string) => {
    const result = await sql`
        DELETE
        FROM categories
        WHERE user_id = ${user_id}
        RETURNING *;`;
    return result;
};

const modify = async (user_id: string, id: number, newName: string) => {
    const result = await sql`
        UPDATE categories
        SET name = ${newName}
        WHERE id = ${id} AND user_id = ${user_id}
        RETURNING *;`;
    return result[0];
};

export { getAll, getOne, create, remove, removeAll, modify };