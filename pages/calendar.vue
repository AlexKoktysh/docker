<script setup>
const colorMode = useColorMode();

const date = ref(new Date());

const attrs = ref([
    {
        key: "today",
        highlight: {
            fillMode: "light",
        },
        dates: new Date(),
    },
    {
        dot: "red",
        dates: [new Date(2024, 0, 21), new Date()],
    },
]);
</script>

<template>
    <VDatePicker
        transparent
        borderless
        v-model="date"
        :attributes="attrs"
        expanded
        :is-dark="colorMode.value === 'dark'"
    />
</template>
