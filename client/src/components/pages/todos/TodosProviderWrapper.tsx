import { Outlet } from "react-router-dom";
import { TodosProvider } from "../../../states/TodosContext";

function TodosProviderWrapper() {
    return (
        <TodosProvider>
            <Outlet />
        </TodosProvider>
    );
}

export default TodosProviderWrapper;