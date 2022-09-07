import { useEffect, useRef } from "react";

export const useEventListener = <K extends keyof DocumentEventMap>(
    type: K,
    handler: (ev: DocumentEventMap[K]) => void,
    target?: Element | any
) => {
    const ref: any = useRef();
    ref.current = handler;

    useEffect(() => {
        let element = target;
        if (!element) {
            element = document;
        }
        if (!element?.addEventListener) {
            return;
        }
        const eventListener = (event: Event) => ref.current(event);
        element.addEventListener(type, eventListener);
        return () => {
            element.removeEventListener(type, eventListener)
        }
    }, [type, target]);
}