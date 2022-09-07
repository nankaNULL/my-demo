import { useEffect, useState } from "react";

// Hook
export function useMedia(queries: any[], values: any[], defaultValue: any) {
    // 匹配值的state和setter
    const [value, setValue] = useState(defaultValue);

    // 根据匹配的媒体查询取值的方法
    function getValue(mediaQueryLists: MediaQueryList[]) {
        // 获取第一个匹配的媒体查询的下标
        const index = mediaQueryLists?.findIndex(mql => mql.matches);

        // 返回相对应的值或者默认值
        return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
    };

    useEffect(
        () => {
            // 回调方法
            // 注意：通过在useEffect外定义getValue ...
            // ... 我们可以确定它又从hook的参数传入的最新的值（在这个hook的回调第一次在mount的时候被创建）
            const mediaQueryLists = queries.map(q => window?.matchMedia(q));
            const handler = () => {
                const value = getValue(mediaQueryLists);
                setValue(value)
            };

            // 页面首次加载时，自动执行一次
            handler();

            // 为上面每一个媒体查询设置一个监听作为一个回调
            mediaQueryLists.forEach(mql => mql.addEventListener('change', handler));
            // 在cleanup中清除监听
            return () => mediaQueryLists.forEach(mql => mql.removeEventListener('change', handler));
        },
        [] // 空数组保证了effect只会在mount和unmount时运行
    );

    return value;
}