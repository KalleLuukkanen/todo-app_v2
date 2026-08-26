import type { TodoType } from "../../context/TodosContext";
import Todo from "./Todo";
import * as helpers from "../../utils/helpers";

function ThisMonths({ todoList, sort, categoryFilter, completionFilter }: { todoList: TodoType[], sort: string, categoryFilter: string, completionFilter: string }) {
    const todosSorted = () => {
        if (sort === "newest") return helpers.newest(todoList);
        if (sort === "oldest") return helpers.oldest(todoList);
        if (sort === "nearest") return helpers.nearestDue(todoList);
        return todoList;
    };

    const filteredByCategory = categoryFilter === "all"
        ? todosSorted()
        : helpers.byCategory(todosSorted(), Number(categoryFilter));

    const filteredByCompletion = () => {
        if (completionFilter === "all") return filteredByCategory;
        if (completionFilter === "uncompleted") return helpers.uncompleted(filteredByCategory);
        if (completionFilter === "completed") return helpers.completed(filteredByCategory);
        return filteredByCategory;
    };

    if (todoList.length === 0) return <p className="p-4 text-3xl">No todos due this month</p>
    return (
        <ul className="flex flex-wrap gap-2">
            {filteredByCompletion().map((t) => (
                <li key={t.id}>
                    <Todo id={t.id} />
                </li>
            ))}
        </ul>
    )
}

export default ThisMonths;