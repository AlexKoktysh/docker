export default defineNuxtConfig({
    devtools: { enabled: true },
    extends: ["@nuxt/ui-pro"],
    modules: [
        "@nuxt/ui",
        "nuxt-icon",
        "@samk-dev/nuxt-vcalendar",
        "@nuxtjs/i18n",
        "@pinia/nuxt",
    ],
    i18n: {
        vueI18n: "./i18n.config.ts",
    },
    ui: {
        global: true,
    },
    runtimeConfig: {
        public: {
            apiBase: "http://localhost:5000",
        },
    },
});
