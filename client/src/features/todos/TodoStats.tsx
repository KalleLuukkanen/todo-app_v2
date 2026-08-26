import { useTodos } from "../../context/TodosContext";
import * as helpers from "../../utils/helpers";

function TodoStats() {
    const { todos } = useTodos();


    const incentive = () => {
        const diff = helpers.amountOfUnCompleted(todos);
        if (diff === 0) return "Great, no todos currently!"
        if (diff < 5) return "Good, just a few more to do!";
        if (diff >= 5 && diff < 10) return "Get to working on your todos before they stack up.";
        if (diff >= 10) return "Todos starting to stack up, get to work!"
    }

    return (
        <div className="flex flex-col rounded border p-4 w-fit space-y-4">
            <p className="text-xl">You currently have {helpers.amountOfUnCompleted(todos)} uncompleted <a href="todos" className="underline hover:text-blue-600">todos</a>.</p>
            <p className="text-xl">You have completed {helpers.amountOfCompleted(todos)} out of {helpers.amount(todos)} todos.</p>
            <p className="text-xl">{incentive()}</p>
        </div>
    )
}

export default TodoStats;