import { Request, Response } from "express";
import * as categoriesRepository from "../repositories/categoriesRepository.js";

const getAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const categories = await categoriesRepository.getAll(user_id);
    return res.status(200).json(categories);
};

const getOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.categoryId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const category = await categoriesRepository.getOne(id, user_id);
    if (!category) {
        return res.status(404).json({ error: "Couldn't find category" })
    }
    return res.status(200).json(category);
};

const create = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const category = req.body;
    if (!category.name) {
        return res.status(400).json({ error: "Missing category name." });
    }
    const created_category = await categoriesRepository.create(user_id, category.name);
    if (!created_category) {
        return res.status(404).json({ error: "Couldn't create category" });
    }
    return res.status(200).json(created_category);
};

const remove = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.categoryId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const removed_category = await categoriesRepository.remove(id, user_id);
    if (!removed_category) {
        return res.status(404).json({ error: "Couldn't delete category" });
    }
    return res.status(200).json(removed_category);
};

const removeAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const removed_categories = await categoriesRepository.removeAll(user_id);
    if (!removed_categories) {
        return res.status(404).json({ error: "Couldn't delete categories" });
    }
    return res.status(200).json(removed_categories);
};

const modify = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.categoryId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const category = req.body;
    if (!category.name) {
        return res.status(400).json({ error: "Missing category name" });
    }
    const modified_category = await categoriesRepository.modify(user_id, id, category.name);
    if (!modified_category) {
        return res.status(404).json({ error: "Couldn't modify category" });
    }
    return res.status(200).json(modified_category);
};

export { getAll, getOne, create, remove, removeAll, modify };