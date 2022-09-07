import { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener } from "./useEventListener";

interface PositionType {
    x: number;
    y: number;
}

const EventListener: React.FC = () => {
    const ref = useRef(null);
    const [position, setPosition] = useState<PositionType>({
        x: 0,
        y: 0
    });
    const [count, setCount] = useState<number>(0);

    const handle = useCallback((e: MouseEvent) => {
        const { clientX, clientY } = e;
        setPosition({
            x: clientX,
            y: clientY
        })
    }, [setPosition]);

    const handleClick = () => {
        setCount(count + 1);
    }

    // useEventListener('mousemove', handle)

    useEventListener(
        'click',
        handleClick,
        ref.current,
    );

    return (
        <div style={{ height: 300 }}>
            mouse position: ({position.x}, {position.y})
            <p ref={ref}>click test: {count}</p>
        </div>
    )
}
export default EventListener;
