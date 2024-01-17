export default defineI18nConfig(() => ({
    legacy: false,
    locale: "EN",
    messages: {
        EN: {
            Sidebar: {
                calendar: "Calendar",
                profile: "Profile",
                clipboard: "Dashboards",
            },
            Index: {
                title: "Home Page",
                toDo: "To do",
                inProgress: "In progress",
                inTest: "In test",
                inCompleted: "Completed",
                add: "Add card",
            },
            Profile: {
                title: "Profile Page",
            },
        },
        RU: {
            Sidebar: {
                calendar: "Календарь",
                profile: "Профиль",
                clipboard: "Доски",
            },
            Index: {
                title: "Домашняя страница",
                toDo: "К выполнению",
                inProgress: "В процессе",
                inTest: "В тесте",
                inCompleted: "Выполнено",
                add: "Добавить карточку",
            },
            Profile: {
                title: "Профайл страница",
            },
        },
    },
}));
