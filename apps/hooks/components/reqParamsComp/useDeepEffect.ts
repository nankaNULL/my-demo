import { isEqual } from "lodash";
import { useEffect, useRef } from "react";

/**
 * 有状态的，或者有副作用的。
 * 接收什么
 * 返回什么
 * 用 useMemo， useCallback 等进行优化
 * https://betterprogramming.pub/how-to-use-the-react-hook-usedeepeffect-815818c0ad9d
 */
export const useDeepEffect = (effect: React.EffectCallback, deps: React.DependencyList) => {

    let store: any = useRef();

    // deps 中的每一项与之前的进行比较
    if (!isEqual(deps, store.current)) {
        store.current = deps;
    }
  
    // 调用
    useEffect(effect, store.current);
}