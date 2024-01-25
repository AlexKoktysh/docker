<template>
    <div
        class="container"
        :id="id"
        @dragenter.prevent
        @dragover.prevent
        @drop="onDrop(status as CardStatusType)"
    >
        <UCard class="bg-slate-200 dark:bg-slate-600">
            <template #header>{{ header }}</template>
            <div class="body overflow-y-auto">
                <NuxtLink :to="`/cards/${activeCard}`">
                    <div
                        class="h-14 flex justify-center items-center border-2 rounded-lg border-cyan-950 my-5"
                        v-for="element in items"
                        :key="id"
                        draggable="true"
                        @dragstart="startDrag(element?._id)"
                        @click="() => (activeCard = element._id)"
                    >
                        {{ element.title }}
                    </div>
                </NuxtLink>
            </div>
            <template #footer>
                <div
                    class="flex justify-center items-center cursor-pointer"
                    @click="addCard"
                >
                    <UIcon name="i-heroicons-plus" class="mr-4" />
                    {{ $t("Index.add") }}
                </div>
            </template>
        </UCard>
        <UModal v-model="isOpen">
            <div class="p-4">
                <ModalsAddCard
                    @close="() => (isOpen = false)"
                    :status="status"
                />
            </div>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { type Card, type CardStatusType } from "../../types";
import { useToDoListStore } from "../../store/ToDoListStore";

const props = defineProps({
    header: String,
    id: String,
    items: {
        type: Array<Card>,
    },
    status: {
        type: String,
    },
});

const toDoStore = useToDoListStore();

const isOpen = ref(false);
const activeCard = ref();

const addCard = () => {
    isOpen.value = true;
};

const onDrop = (key?: CardStatusType) => {
    if (key) {
        toDoStore.changeCardsList({ status: key }, key);
    }
};
const startDrag = (elementId?: string) => {
    const item = props.items?.find((el) => el._id === elementId);
    toDoStore.setDragElement(item);
};
</script>

<style scoped lang="scss">
.container {
    min-width: 350px;
    padding: 20px;
}
.body {
    max-height: calc(100vh - 300px);
}
</style>
