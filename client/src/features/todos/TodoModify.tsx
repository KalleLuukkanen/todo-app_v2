import { useTodos } from "../../context/TodosContext";
import { useState } from "react";
import useCategories from "../../hooks/useCategories";
import { toDatetimeLocal } from "../../utils/helpers";

function TodoModify({ id }: { id: number }) {
    const { todos, removeTodo, modify } = useTodos();
    const { categories, createCategory } = useCategories();

    const todo = todos.find((t) => t.id === id);

    const [name, setName] = useState(todo?.name ?? "");
    const [description, setDescription] = useState(todo?.description ?? "");
    const [deadline, setDeadline] = useState(toDatetimeLocal(todo?.deadline ?? null));
    const [done, setDone] = useState(todo?.done ?? false)
    const [category, setCategory] = useState(todo?.category_id ?? null);

    const [categoryChoice, setCategoryChoice] = useState(category !== null ? "existing" : "no");
    const [newCategoryName, setNewCategoryName] = useState("");

    if (!todo) return null;

    const remove = async () => { };

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
        >
            <form
                className="flex flex-col  min-w-60 rounded border border-gray-300 p-4 shadow-md space-y-8"
                onSubmit={handleForm}
            >
                <p className="text-2xl font-bold">Modify todo:</p>
                <div className="flex flex-col space-y-4">
                    <label className="flex flex-col space-y-2">
                        <span>Name</span>
                        <input
                            id="name"
                            className="ml-2 rounded border border-gray-400 p-2"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col space-y-2">
                        <span>Description</span>
                        <textarea
                            id="description"
                            rows={3}
                            className="ml-2 rounded border border-gray-400 p-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add a description"
                        />
                    </label>
                    <label className="flex flex-col space-y-2">
                        <span>Deadline</span>
                        <input
                            id="due"
                            className="ml-2 rounded border border-gray-400 p-2"
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </label>
                    <div className="flex flex-col space-y-2">
                        <span>Done?</span>
                        <div className="flex mx-auto space-x-8">
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    checked={!done}
                                    onChange={(e) => setDone(false)}
                                />
                                {" "}No
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="true"
                                    checked={done}
                                    onChange={(e) => setDone(true)}
                                />
                                {" "}Yes
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <span>Category</span>
                        <label>
                            <input
                                type="radio"
                                name="category_choice"
                                value="no"
                                checked={categoryChoice === "no"}
                                onChange={(e) => setCategoryChoice(e.target.value)}
                            />
                            {" "}No category
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category_choice"
                                value="existing"
                                checked={categoryChoice === "existing"}
                                onChange={(e) => setCategoryChoice(e.target.value)}
                            />
                            {" "}Choose from existing
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category_choice"
                                value="new"
                                checked={categoryChoice === "new"}
                                onChange={(e) => setCategoryChoice(e.target.value)}
                            />
                            {" "}Create new
                        </label>
                    </div>
                    {categoryChoice === "new" && (
                        <label className="flex flex-col space-y-2">
                            <p>New category:</p>

                            <input
                                id="new_category"
                                type="text"
                                className="rounded border border-gray-400 p-2"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="Write a name for the new category here"
                            />
                        </label>
                    )}

                    {categoryChoice === "existing" && (
                        <label className="flex flex-col space-y-2">
                            <p>Existing categories:</p>

                            <select
                                id="existing_category"
                                className="rounded border border-gray-400 p-2"
                                value={category as number}
                                onChange={(e) => setCategory(Number(e.target.value))}
                            >
                                <option value="">Select a category</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </label>
                    )}
                </div>

                <div className="flex space-x-4">
                    <button onClick={() => remove()} className="cursor-pointer rounded bg-red-300 p-2 ml-4">Delete todo</button>
                    <button type="submit" className="cursor-pointer rounded bg-green-300 p-2 ml-auto mr-4">Save changes</button>
                </div>
            </form>
        </div>
    )
}

export default TodoModify;