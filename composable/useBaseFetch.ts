import type { UseFetchOptions } from "#app";
import { defu } from "defu";
import { useUserStore } from "../store/UserStore";

export function useBaseFetch<T>(url: string, options = {}) {
    const store = useUserStore();
    const defaults: UseFetchOptions<T> = {
        baseURL: useRuntimeConfig().public.baseURL,
        key: url,
        credentials: "include",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        onResponse(_ctx) {
            return _ctx.response._data;
        },

        onResponseError(_ctx) {
            if (_ctx.response.status === 401) {
                store.$patch((state) => {
                    state.authenticated = false;
                });
            }
        },
    };
    const params = defu(options, defaults);

    return $fetch(url, params);
}
