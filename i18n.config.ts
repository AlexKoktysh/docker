export default defineI18nConfig(() => ({
    legacy: false,
    locale: "EN",
    messages: {
        EN: {
            Sidebar: {
                calendar: "Calendar",
                profile: "Profile",
            },
            Index: {
                title: "Home Page",
            },
        },
        RU: {
            Sidebar: {
                calendar: "Календарь",
                profile: "Профиль",
            },
            Index: {
                title: "Домашняя страница",
            },
        },
    },
}));
