import { useUserStore } from "../store/UserStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated } = useUserStore();
    if (!authenticated && to?.name !== "signin") {
        abortNavigation();
        return navigateTo("/signin");
    }
});
