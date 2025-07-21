    import { useState } from "react";
    import { useExpensiveValue } from "../hooks";

    const ExpensiveComponent = () => {
    const [count, setCount] = useState(0);
    const [toggle, setToggle] = useState(false);

    const expensiveValue = useExpensiveValue(count);

    return (
        <div className="p-4 space-y-4 bg-gray-100">
        <p>Count: {count}</p>
        <div className="space-x-4">
            <button
            onClick={() => setCount((c) => c + 1)}
            className="btn btn-primary"
            >
            +1
            </button>
            <button onClick={() => setToggle((t) => !t)} className="btn btn-info">
            Toggle
            </button>
        </div>

        <p>Expensive Value : {expensiveValue}</p>
        </div>
    );
    };

    export default ExpensiveComponent;
