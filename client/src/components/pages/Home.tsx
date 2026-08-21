import { useState } from "react";
import ThreeLatest from "./todos/ThreeLatest";
import Todays from "./todos/Todays";
import ThisWeeks from "./todos/ThisWeeks";

function Home() {
    const [isOpen_1, setIsOpen_1] = useState(true);
    const [isOpen_2, setIsOpen_2] = useState(false);
    const [isOpen_3, setIsOpen_3] = useState(false);



    return (
        <div className="flex flex-col space-y-4">
            <div className="space-y-2">
                <button className="cursor-pointer text-3xl font-bold" onClick={() => setIsOpen_1(!isOpen_1)}>Most urgent todos</button>
                {isOpen_1 && <ThreeLatest />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <button className="cursor-pointer text-3xl font-bold" onClick={() => setIsOpen_2(!isOpen_2)}>Due today</button>
                    {isOpen_2 && <Todays />}
                </div>
                <div className="space-y-2">
                    <button className="cursor-pointer text-3xl font-bold" onClick={() => setIsOpen_3(!isOpen_3)}>Due this week</button>
                    {isOpen_3 && <ThisWeeks />}
                </div>
            </div>
        </div>
    )
}

export default Home