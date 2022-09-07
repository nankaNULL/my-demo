import { useRef, useState } from "react";
import { Button } from "antd";
import { cloneDeep } from "lodash";
import { useObserver } from "./useObserver";

const ObserverPage: React.FC = () => {
    const ref = useRef(null);
    const [list, setList] = useState<any[]>([{
        id: 0,
        name: 'name0'
    }]);

    const handleAdd = () => {
        const newList = cloneDeep(list);
        newList.push({
            id: list.length,
            name: 'name' + list.length
        });
        setList(newList);
    }

    const observerCallback = () => {
        console.log('callback', list);
    }

    const intersectionCallback = () => {
        console.log('button show');
    }

    useObserver('MutationObserver', global?.document?.querySelector('ul'), observerCallback, {
        childList: true
    })
    useObserver('IntersectionObserver', global?.document?.querySelector('button'), intersectionCallback)

    return (
        <div>
            <Button onClick={handleAdd}>ADD</Button>
            <ul ref={ref}>
                {list.map((item: any) => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    )
}
export default ObserverPage;
