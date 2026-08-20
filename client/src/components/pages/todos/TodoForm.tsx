import { useState } from "react";

function TodoForm() {
    const handleForm = () => { };

    const [category, setCategory] = useState("no");

    return (
        <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
        >
            <form onSubmit={handleForm} className="flex flex-col space-y-8">
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
                            name="name"
                            className="ml-2 rounded border border-gray-400 p-2"
                            type="text"
                            required
                            placeholder="Write a short name here"
                        />
                    </label>

                    <label className="flex flex-col space-y-2 text-xl">
                        <p>Description: (optional)</p>

                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="ml-2 rounded border border-gray-400 p-2"
                            placeholder="Add a description"
                        />
                    </label>

                    <label className="flex flex-col space-y-2 text-xl">
                        <p>When is it due? (optional)</p>

                        <input
                            id="due"
                            name="due"
                            className="ml-2 rounded border border-gray-400 p-2"
                            type="datetime-local"
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
                                        name="category"
                                        checked={category === "no"}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                    {" "}No category
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        value="existing"
                                        name="category"
                                        checked={category === "existing"}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                    {" "}Choose from existing
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        value="new"
                                        name="category"
                                        checked={category === "new"}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                    {" "}Create new
                                </label>
                            </div>

                            {category === "new" && (
                                <label className="flex flex-col space-y-2">
                                    <p>New category:</p>

                                    <input
                                        id="new-category"
                                        name="new-category"
                                        type="text"
                                        className="rounded border border-gray-400 p-2"
                                        placeholder="Write a name for the new category here"
                                    />
                                </label>
                            )}

                            {category === "existing" && (
                                <label className="flex flex-col space-y-2">
                                    <p>Existing categories:</p>

                                    <select
                                        id="existing-category"
                                        name="existing-category"
                                        className="rounded border border-gray-400 p-2"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer rounded bg-blue-200 p-2"
                    >
                        Add todo
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TodoForm;