import type { UseFetchOptions } from "#app";
import { defu } from "defu";
import { useUserStore } from "../store/UserStore";

export function useBaseFetch<T>(url: string, options = {}) {
    const { setAuth } = useUserStore();
    const defaults: UseFetchOptions<T> = {
        baseURL: useRuntimeConfig().public.baseURL,
        key: url,
        headers: { credentials: "include" },
        onResponse(_ctx) {
            return _ctx.response._data;
        },

        onResponseError(_ctx) {
            if (_ctx.response.status === 401) {
                setAuth();
            }
        },
    };
    const params = defu(options, defaults);

    return $fetch(url, params);
}
