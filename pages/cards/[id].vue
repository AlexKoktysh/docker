<template>
    <UCard>
        <template #header>
            <UTextarea v-model="title" @blur="updateCard" />
        </template>
        <UTextarea v-model="description" @blur="updateCard" />
    </UCard>
</template>

<script setup>
import { useToDoListStore } from "~/store/ToDoListStore";

const toDoStore = useToDoListStore();
const route = useRoute();

await toDoStore.getCardById(route.params.id);

const title = ref(toDoStore.activeCard.title);
const description = ref(toDoStore.activeCard.description);

const updateCard = () => {
    toDoStore.changeCard({
        title: title.value,
        description: description.value,
    });
};
</script>
