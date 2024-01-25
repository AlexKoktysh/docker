<template>
    <UCard>
        <template #header>
            <UTextarea v-model="title" @blur="updateCard" />
        </template>
    </UCard>
</template>

<script setup>
import { useToDoListStore } from "../../store/ToDoListStore";

const toDoStore = useToDoListStore();
const route = useRoute();

await toDoStore.getCardById(route.params.id);

const title = ref(toDoStore.activeCard.title);

const updateCard = () => {
    toDoStore.changeCard({
        title: title.value,
    });
    // console.log("toDoStore.activeCard", toDoStore.activeCard);
    // console.log("title", title);
};
</script>
