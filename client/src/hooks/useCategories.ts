import { useState, useEffect } from "react";
import * as categoriesApi from "../api/categoriesApi";

export type Category = {
    id: number;
    name: string;
};

function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        categoriesApi.getAll().then((data) => {
            setCategories(data);
            setLoading(false);
        });
    }, []);

    const createCategory = async (name: string) => {
        const created = await categoriesApi.create(name);
        setCategories((prev) => [...prev, created]);
        return created;
    };

    const removeCategory = async (categoryId: number) => {
        const removed = await categoriesApi.remove(categoryId);
        setCategories((prev) => prev.filter((c) => c.id !== removed.id));
    };

    const modifyCategory = async (categoryId: number, name: string) => {
        const updated = await categoriesApi.modify(categoryId, name);
        setCategories((prev) => prev.map((c) => (c.id === categoryId ? updated : c)));
    };

    const removeAllCategories = async () => {
        await categoriesApi.removeAll();
        setCategories([]);
    };

    return { categories, loading, createCategory, removeCategory, modifyCategory, removeAllCategories };
}

export default useCategories;