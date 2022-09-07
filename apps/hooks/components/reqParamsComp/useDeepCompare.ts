import { isEqual } from "lodash";
import { useRef } from "react";

export const useDeepCompare = (deps: React.DependencyList) => {
    let store: any = useRef();

    // deps 中的每一项与之前的进行比较
    if (!isEqual(deps, store.current)) {
        store.current = deps;
    }
    return store.current;
}