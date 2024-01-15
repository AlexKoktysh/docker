<template>
    <UVerticalNavigation
        :links="links"
        class="sidebar w-1/4 bg-sidebar-light dark:bg-sidebar-dark px-4 pt-4"
    >
        <template #default="{ link }">
            <span class="group-hover:text-primary relative py-2">{{
                $t(link.label)
            }}</span>
        </template>
    </UVerticalNavigation>
</template>

<script setup>
const links = [
    {
        label: "Sidebar.clipboard",
        icon: "i-heroicons-clipboard-document-list",
        to: "/",
    },
    {
        label: "Sidebar.profile",
        avatar: {
            src: "https://avatars.githubusercontent.com/u/739984?v=4",
        },
        to: "/profile",
    },
    {
        label: "Sidebar.calendar",
        icon: "i-heroicons-calendar-days",
        to: "/calendar",
    },
];
</script>

<style lang="scss">
.sidebar {
    li {
        margin: 10px 0;
    }
}
</style>
