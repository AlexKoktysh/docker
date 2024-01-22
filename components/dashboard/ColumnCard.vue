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
                    @dragstart="startDrag(id as string, element?._id as string)"
                >
                    {{ element.title }}
                </div>
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
import { type Card } from "../../types";
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

watch(toDoStore, (val) => {
    console.log("value", val.toDoCards);
});

const isOpen = ref(false);

const addCard = () => {
    isOpen.value = true;
};

const onDrop = (key: string) => {
    const status = setStatus(key);
    toDoStore.changeCard({ status }, key);
};
const startDrag = (parentId: string, elementId: string) => {
    const item = props.items?.find((el) => el._id === elementId);
    toDoStore.setDragElement(item, parentId);
};

const setStatus = (key: string) => {
    switch (key) {
        case "dropzone1":
            return "TO_DO";
        case "dropzone2":
            return "IN_PROGRESS";
        case "dropzone3":
            return "IN_TEST";
        case "dropzone4":
            return "IN_COMPLETED";
        default:
            return "TO_DO";
    }
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
