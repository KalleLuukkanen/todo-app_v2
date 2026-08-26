import type { TodoType } from "../context/TodosContext";

export const toDatetimeLocal = (isoString: string | null) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

//sorting todos
export const nearestDue = (todos: TodoType[]) => {
    return [...todos].sort((a, b) => {
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
};
export const newest = (todos: TodoType[]) => {
    return [...todos].sort((a, b) => new Date(b.created_at as string).getTime() - new Date(a.created_at as string).getTime());
};
export const oldest = (todos: TodoType[]) => {
    return [...todos].sort((a, b) => new Date(a.created_at as string).getTime() - new Date(b.created_at as string).getTime());
};

//filtering todos
export const mostUrgent = (todos: TodoType[]) => {
    return nearestDue(todos).slice(0, 3).filter((t) => t.deadline && !t.done);
};
export const dueToday = (todos: TodoType[]) => {
    const today = new Date();
    return todos.filter((t) => {
        if (!t.deadline) return false;
        const d = new Date(t.deadline);
        return d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear();
    });
};
export const dueThisWeek = (todos: TodoType[]) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = (dayOfWeek + 6) % 7;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - daysSinceMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return todos.filter((t) => {
        if (!t.deadline) return false;
        const deadline = new Date(t.deadline);
        return deadline >= startOfWeek && deadline < endOfWeek;
    });
};
export const dueThisMonth = (todos: TodoType[]) => {
    const today = new Date();
    return todos.filter((t) => {
        if (!t.deadline) return false;
        const d = new Date(t.deadline);
        return d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear();
    });
};

export const completed = (todos: TodoType[]) => {
    return todos.filter((t) => t.done);
};
export const uncompleted = (todos: TodoType[]) => {
    return todos.filter((t) => !t.done);
};

export const byCategory = (todos: TodoType[], categoryId: number | null) => {
    return todos.filter((t) => {
        if (!t.category_id) return false;
        return t.category_id === categoryId;
    })
};

//todo stats
export const amount = (todos: TodoType[]) => {
    return todos.length;
};
export const amountOfCompleted = (todos: TodoType[]) => {
    return completed(todos).length;
};
export const amountOfUnCompleted = (todos: TodoType[]) => {
    return uncompleted(todos).length;
};