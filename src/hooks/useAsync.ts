import { DependencyList, useEffect } from "react";
import useAsyncFn from "./useAsyncFn";

export { AsyncState, AsyncFn } from "./useAsyncFn";

export default function useAsync<Result = any, Args extends any[] = any[]>(
    fn: (args: Object | {}) => Promise<Result>,
    deps: DependencyList = [],
    callbackArgs: Object = {}
) {
    const [state, callback] = useAsyncFn<Result, Args>(fn, deps, {
        loading: true
    });

    useEffect(() => {
        callback(callbackArgs);
    }, [callback]);

    return state;
}
