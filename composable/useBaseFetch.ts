export const useBaseFetch = (url: string, options = {}) =>
    $fetch(`${useRuntimeConfig().public.baseURL}${url}`, options);
