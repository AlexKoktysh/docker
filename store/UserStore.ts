import { useBaseFetch } from "~/composable/useBaseFetch";
import type { User } from "~/types";

type RootState = {
    user: null | User;
    authenticated: boolean;
};

export const useUserStore = defineStore("user", {
    state: () =>
        ({
            user: null,
            authenticated: false,
        }) as RootState,
    actions: {
        async signUp(body: { email: string; password: string }) {
            const data = await useBaseFetch(`/auth/signup`, {
                method: "POST",
                body: JSON.stringify(body),
            });
            debugger;
        },
        async signIn(body: { email: string; password: string }) {
            const data = await useBaseFetch(`/auth/signin`, {
                method: "POST",
                body: JSON.stringify(body),
            });
            debugger;
        },
    },
});
