<template>
    <USelect
        v-model="locale"
        :options="languages"
        option-attribute="name"
        size="lg"
    />
</template>

<script setup>
const { locale } = useI18n();
const languages = [
    {
        value: "EN",
        name: "🇺🇸 English",
    },
    {
        value: "RU",
        name: "🇷🇺 Русский",
    },
];
</script>
