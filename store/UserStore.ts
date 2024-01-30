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
            authenticated: true,
        }) as RootState,
    actions: {
        async signUp(body: { email: string; password: string }) {
            const data = (await useBaseFetch(`/auth/signup`, {
                method: "POST",
                body,
                headers: { credentials: "include" },
            })) as User;
            if (data.email) {
                this.user = data;
                this.authenticated = true;
            }
        },
        async signIn(body: { email: string; password: string }) {
            const data = (await useBaseFetch(`/auth/signin`, {
                method: "POST",
                body,
            })) as User;
            if (data.email) {
                this.user = data;
                this.authenticated = true;
            }
        },
        async signOut() {
            const data = await useBaseFetch(`/auth/signout`, {
                method: "POST",
            });
            debugger;
        },
        getAuth() {
            return this.authenticated;
        },
    },
});
