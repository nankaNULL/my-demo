let workInProgressHook: any = null;
let firstWorkInProgressHook: any = null;

function mountWorkInProgressHook() {
    const hook = {
        memoizedState: null,

        baseState: null,
        queue: null,
        baseUpdate: null,

        next: null,
    };

    if (workInProgressHook === null) {
        // This is the first hook in the list
        firstWorkInProgressHook = workInProgressHook = hook;
    } else {
        // Append to the end of the list
        workInProgressHook = workInProgressHook.next = hook;
    }
    return workInProgressHook;
}


function mountRef<T>(initialValue: T): { current: T } {
    const hook = mountWorkInProgressHook();
    const ref = { current: initialValue };
    hook.memoizedState = ref;
    return ref;
}

export const useRef = mountRef;

// workinprogress
// 执行 hook，创建一个 hook progress
// hook 中的 memoizedState 存放本次获取到的 ref
// 将 progress 链到 next 等待下一次执行


// 链表