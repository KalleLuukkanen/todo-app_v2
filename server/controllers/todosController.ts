import { Request, Response } from "express";
import * as todosRepository from "../repositories/todosRepository.js";

const getAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const todos = await todosRepository.getAll(user_id);
    return res.status(200).json(todos);
};

const getOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.todoId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" })
    }
    const todo = await todosRepository.getOne(user_id, id);
    if (!todo) {
        return res.status(404).json({ error: "Couldn't find todo" });
    }
    return res.status(200).json(todo);
};

const create = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const todo = req.body;
    if (!todo.name) {
        return res.status(400).json({ error: "Missing todo name" });
    }
    const created_todo = await todosRepository.create(user_id, todo.name, todo.description ?? null, todo.category_id ?? null, todo.deadline ?? null);
    if (!created_todo) {
        return res.status(404).json({ error: "Couldn't create todo" });
    }
    return res.status(200).json(created_todo);
};

const remove = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.todoId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" })
    }
    const removed_todo = await todosRepository.remove(user_id, id);
    if (!removed_todo) {
        return res.status(404).json({ error: "Couldn't delete todo" })
    }
    return res.status(200).json(removed_todo);
};

const removeAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const removed_todos = await todosRepository.removeAll(user_id);
    if (!removed_todos) {
        return res.status(404).json({ error: "Couldn't delete todos" });
    }
    return res.status(200).json(removed_todos);
};

const modify = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.todoId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const todo = req.body;
    if (!todo.name) {
        return res.status(400).json({ error: "Missing todo name" });
    }
    const modified_todo = await todosRepository.modify(user_id, id, todo.name, todo.description ?? null, todo.category_id ?? null, todo.deadline ?? null, todo.done ?? null);
    if (!modified_todo) {
        return res.status(404).json({ error: "Couldn't modify todo" });
    }
    return res.status(200).json(modified_todo);
};

const completeOrUncomplete = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.todoId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const todo = req.body;
    if (typeof todo.done !== "boolean") {
        return res.status(400).json({ error: "Missing required parameters" });
    }
    const modified_todo = await todosRepository.completeOrUncomplete(user_id, id, todo.done);
    if (!modified_todo) {
        return res.status(404).json({ error: "Couldn't modify todo" });
    }
    return res.status(200).json(modified_todo);
};

export { getAll, getOne, create, remove, removeAll, modify, completeOrUncomplete };