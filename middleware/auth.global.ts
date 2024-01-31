import { useUserStore } from "~/store/UserStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useUserStore();
    watch(store, (val) => {
        if (!val.authenticated) return navigateTo("/signin");
        return navigateTo("/");
    });
    if (!store.authenticated && to.fullPath !== "/signin") {
        return navigateTo("/signin");
    }
});
