import { useState } from "react";
import { Button } from "antd";

const Project: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    const handleClick = () => {
        setCount((c) => c + 1);
    }

    return (
        <div>
            <h1>Project Page</h1>
            <Button onClick={handleClick}>{count}</Button>
        </div>
    )
}
export default Project;
