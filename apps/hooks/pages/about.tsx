import { useState } from "react";
import { Button } from "antd";
import 'antd/dist/antd.css';

const About: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    
    const handleClick = () => {
        setCount((c) => c + 1);
    }
    return (
        <div>
            <p>{count}</p>
            <Button type="primary" onClick={handleClick}>count</Button>
        </div>
    )
}
export default About;
