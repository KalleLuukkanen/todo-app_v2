import { useState } from "react";
import useCategories from "../../hooks/useCategories";
import { useTodos } from "../../context/TodosContext";

function TodoForm({ onClose }: { onClose: () => void }) {
    const { categories, createCategory } = useCategories();
    const { createTodo } = useTodos();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [categoryChoice, setCategoryChoice] = useState("no");
    const [existingCategoryId, setExistingCategoryId] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let category_id: number | null = null;

        if (categoryChoice === "existing" && existingCategoryId) {
            category_id = Number(existingCategoryId);
        } else if (categoryChoice === "new" && newCategoryName) {
            const created = await createCategory(newCategoryName);
            category_id = created.id;
        }

        await createTodo({
            name,
            description: description || null,
            category_id,
            deadline: deadline ? new Date(deadline).toISOString() : null,
        });

        onClose();

    };

    return (
        <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
        >
            <form onSubmit={handleForm} className="flex flex-col space-y-8 p-4 border-2 border-gray-300 rounded">
                <p className="rounded bg-blue-200 p-4 text-2xl font-bold">
                    Add a new todo:
                </p>

                <div className="flex flex-col space-y-6">
                    <label className="flex flex-col space-y-2 text-xl">
                        <p>
                            What do you need done?{" "}
                            <span className="cursor-help" title="required">
                                *
                            </span>
                        </p>

                        <input
                            id="name"
                            className="ml-2 rounded border border-gray-400 p-2"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Write a short name here"
                        />
                    </label>

                    <label className="flex flex-col space-y-2 text-xl">
                        <p>Description: (optional)</p>

                        <textarea
                            id="description"
                            rows={3}
                            className="ml-2 rounded border border-gray-400 p-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add a description"
                        />
                    </label>

                    <label className="flex flex-col space-y-2 text-xl">
                        <p>When is it due? (optional)</p>

                        <input
                            id="due"
                            className="ml-2 rounded border border-gray-400 p-2"
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </label>

                    <div className="flex flex-col space-y-2 text-xl">
                        <p>Category: (optional)</p>

                        <div className="ml-2 flex flex-col space-y-2">
                            <div className="flex flex-col items-start space-y-2">
                                <label>
                                    <input
                                        type="radio"
                                        value="no"
                                        name="category_choice"
                                        checked={categoryChoice === "no"}
                                        onChange={(e) => setCategoryChoice(e.target.value)}
                                    />
                                    {" "}No category
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        value="existing"
                                        name="category_choice"
                                        checked={categoryChoice === "existing"}
                                        onChange={(e) => setCategoryChoice(e.target.value)}
                                    />
                                    {" "}Choose from existing
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        value="new"
                                        name="category_choice"
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
                                        value={existingCategoryId}
                                        onChange={(e) => setExistingCategoryId(e.target.value)}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </label>
                            )}
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="cursor-pointer rounded bg-blue-300 p-2"
                >
                    Add todo
                </button>
            </form>
        </div>
    );
}

export default TodoForm;