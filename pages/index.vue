<template>
    <div class="flex h-full overflow-auto">
        <DashboardColumnCard
            v-for="el in items"
            :key="el.name"
            :header="$t(el.name)"
            :items="el.items"
            :id="el.id"
        />
    </div>
</template>

<script setup>
const items = [
    {
        name: "Index.toDo",
        items: [
            { id: 1, title: "toDo 1" },
            { id: 2, title: "toDo 2" },
            { id: 3, title: "toDo 3" },
        ],
        id: "dropzone1",
    },
    {
        name: "Index.inProgress",
        items: [
            { id: 4, title: "inProgress 1" },
            { id: 5, title: "inProgress 2" },
            { id: 6, title: "inProgress 3" },
        ],
        id: "dropzone2",
    },
    {
        name: "Index.inTest",
        items: [
            { id: 7, title: "inTest 1" },
            { id: 8, title: "inTest 2" },
            { id: 9, title: "inTest 3" },
        ],
        id: "dropzone3",
    },
    {
        name: "Index.inCompleted",
        items: [
            { id: 10, title: "inCompleted 1" },
            { id: 11, title: "inCompleted 2" },
            { id: 12, title: "inCompleted 3" },
        ],
        id: "dropzone4",
    },
];
</script>
