<template>
    <UVerticalNavigation :links="links" class="w-1/4">
        <template #default="{ link }">
            <span class="group-hover:text-primary relative">{{
                $t(link.label)
            }}</span>
        </template>
    </UVerticalNavigation>
</template>

<script setup>
const links = [
    {
        label: "Sidebar.profile",
        avatar: {
            src: "https://avatars.githubusercontent.com/u/739984?v=4",
        },
        to: "/",
    },
    {
        label: "Sidebar.calendar",
        icon: "i-heroicons-calendar-days",
        to: "/calendar",
    },
];
</script>
