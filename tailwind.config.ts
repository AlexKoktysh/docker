import type { Config } from "tailwindcss";

export default <Partial<Config>>{
    content: ["docs/content/**/*.md"],
    theme: {
        extend: {
            colors: {
                header: {
                    light: "#9787c3",
                    dark: "#440ddb",
                },
                sidebar: {
                    light: "#dadce0",
                    dark: "#505256",
                },
            },
        },
    },
};
