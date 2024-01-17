<template>
    <div
        class="container"
        :id="id"
        @dragenter.prevent
        @dragover.prevent
        @drop="onDrop(id as string)"
    >
        <UCard class="bg-slate-200 dark:bg-slate-600">
            <template #header>{{ header }}</template>
            <div class="body overflow-y-auto">
                <div
                    class="h-14 flex justify-center items-center border-2 rounded-lg border-cyan-950 my-5"
                    v-for="element in items"
                    :key="id"
                    draggable="true"
                    @dragstart="startDrag(id as string, element.id)"
                >
                    {{ element.title }}
                </div>
            </div>
            <template #footer>
                <div class="flex justify-center items-center">
                    <UIcon name="i-heroicons-plus" class="mr-4" />
                    {{ $t("Index.add") }}
                </div>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { type ToDoListItem } from "../../types";
import { useToDoListStore } from "../../store/ToDoListStore";

const props = defineProps({
    header: String,
    id: String,
    items: {
        type: Array<ToDoListItem>,
    },
});

const toDoStore = useToDoListStore();

const onDrop = (key: string) => {
    toDoStore.changeListItems(key);
    toDoStore.setDragElement(undefined);
    toDoStore.setLeavingZone(undefined);
};
const startDrag = (parentId: string, elementId: number) => {
    const item = props.items?.find((el) => el.id === elementId);
    toDoStore.setDragElement(item);
    toDoStore.setLeavingZone(parentId);
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
