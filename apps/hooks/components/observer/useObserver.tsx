import { useEffect, useRef } from "react";
import { useDeepCompare } from "../reqParamsComp/useDeepCompare";

type ObserverType = 'ResizeObserver' | 'MutationObserver' | 'IntersectionObserver';

const getObserver = (type: ObserverType, callback: any) => {
    let observer: any = null;
    switch (type) {
        case 'ResizeObserver':
            observer = new ResizeObserver(callback);
            break;
        case 'MutationObserver':
            observer = new MutationObserver(callback);
            break;
        case 'IntersectionObserver':
            observer = new IntersectionObserver(callback);
            break;
        default:
            break;
    };
    return observer;
};

export function useObserver(type: ObserverType, target: Element | null, callback: any, options?: any) {
    const callbackRef: any = useRef();
    callbackRef.current = callback;

    const currentCallback = (entries: any, observer: any) => {
        callbackRef.current(entries, observer);
    }
    
    useEffect(() => {
        if(!target) return;
        // 创建一个观察器实例并传入回调函数
        const observer = getObserver(type, currentCallback);
        // 以上述配置开始观察目标节点
        observer.observe(target, options);

        return () => {
            observer.disconnect();
        }
    }, [target, type, useDeepCompare(options)]);
}