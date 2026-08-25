import { useState } from "react";
import AllTodos from "./AllTodos";
import Todays from "./Todays";
import ThisWeeks from "./ThisWeeks";
import ThisMonths from "./ThisMonths";

function Todos() {
    const [isOpen, setIsOpen] = useState(true);
    const [filter, setFilter] = useState("all");
    const [filterOnCompletion, setFilterOnCompletion] = useState("uncompleted");
    const [filterOnCategory, setFilterOnCategory] = useState("all");
    const [sort, setSort] = useState("newest");

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <button className="cursor-pointer text-4xl font-bold" onClick={() => setIsOpen(!isOpen)}>Todos</button>
                {isOpen &&
                    <div className="flex space-x-4 ml-auto">
                        <select
                            id="sort"
                            name="sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="rounded border border-gray-400 p-2"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="nearest">Nearest due</option>
                        </select>
                        <select
                            id="filter_category"
                            name="filter_category"
                            value={filterOnCategory}
                            onChange={(e) => setFilterOnCategory(e.target.value)}
                            className="rounded border border-gray-400 p-2"
                        >
                            <option value="all">All categories</option>
                        </select>
                        <select
                            id="filter_completion"
                            name="filter_completion"
                            value={filterOnCompletion}
                            onChange={(e) => setFilterOnCompletion(e.target.value)}
                            className="rounded border border-gray-400 p-2"
                        >
                            <option value="uncompleted">Uncompleted</option>
                            <option value="completed">Completed</option>
                            <option value="all">All</option>
                        </select>
                        <select
                            id="filter"
                            name="filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="rounded border border-gray-400 p-2"
                        >
                            <option value="all">All</option>
                            <option value="today">Due today</option>
                            <option value="week">Due this week</option>
                            <option value="month">Due this month</option>
                        </select>
                    </div>
                }
            </div>
            {
                isOpen && <div className="ml-4">
                    {filter === "all" &&
                        <div className="space-y-2">
                            <p className="text-3xl underline">All todos</p>
                            <AllTodos />
                        </div>}

                    {filter === "today" &&
                        <div className="space-y-2">
                            <p className="text-3xl underline">Due today</p>
                            <Todays />
                        </div>}

                    {filter === "week" &&
                        <div className="space-y-2">
                            <p className="text-3xl underline">Due this week</p>
                            <ThisWeeks />
                        </div>}

                    {filter === "month" &&
                        <div className="space-y-2">
                            <p className="text-3xl underline">Due this month</p>
                            <ThisMonths />
                        </div>}
                </div>
            }

        </div >
    );
}

export default Todos;