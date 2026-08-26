import { useTodos } from "../../context/TodosContext";
import Todo from "./Todo";
import * as helpers from "../../utils/helpers";

function AllTodos({ sort, categoryFilter, completionFilter }: { sort: string, categoryFilter: string | number, completionFilter: string }) {
    const { todos } = useTodos();

    const todosSorted = () => {
        if (sort === "newest") return helpers.newest(todos);
        if (sort === "oldest") return helpers.oldest(todos);
        if (sort === "nearest") return helpers.nearestDue(todos);
        return todos;
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

export default AllTodos;