<template>
    <UHeader class="header max-w-full bg-header-light dark:bg-header-dark">
        <template #logo>
            <Logo class="w-auto h-6" />
        </template>
        <template #right>
            <HeaderLanguageSwitcher />
            <UColorModeButton />
        </template>
    </UHeader>
</template>

<style scoped>
.header :first-child {
    margin: 0;
    max-width: 100vw !important;
}
</style>
