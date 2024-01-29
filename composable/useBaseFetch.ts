import type { UseFetchOptions } from "#app";

// export const useBaseFetch = (url: string, options = {}) => {
//     const opt = {
//         ...options,
//         async onRequest({ request, options }) {
//             options.headers = { credentials: "include" };
//         },
//         async onResponseError({ request, response, options }) {
//             debugger;
//         },
//     };
//     return $fetch(`${useRuntimeConfig().public.baseURL}${url}`, opt);
// };

export function useCustomFetch<T>(
    url: string,
    options: UseFetchOptions<T> = {},
) {
    const userAuth = useCookie("token");
    const config = useRuntimeConfig();

    const defaults: UseFetchOptions<T> = {
        baseURL: useRuntimeConfig().public.baseURL,
        key: url,
        onResponse(_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },
        onResponseError(_ctx) {
            // throw new myBusinessError()
        },
    };

    // for nice deep defaults, please use unjs/defu
    const params = defu(options, defaults);

    return useFetch(url, params);
}
