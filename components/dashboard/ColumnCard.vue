<template>
    <div
        class="container"
        :id="id"
        @dragenter.prevent
        @dragover.prevent
        @drop="onDrop($event, id)"
    >
        <UCard class="bg-slate-200 dark:bg-slate-600">
            <template #header>{{ header }}</template>
            <div
                class="h-14 flex justify-center items-center border-2 rounded-lg border-cyan-950 my-5"
                v-for="{ id, title } in items"
                :key="id"
                draggable="true"
                @dragstart="startDrag($event, id)"
                @touchmove="handleTouchMove($event)"
                @touchend="handleTouchEnd($event, id)"
            >
                {{ title }}
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
type Items = {
    id: number;
    title: string;
};

const props = defineProps({
    header: String,
    id: String,
    items: {
        type: Array<Items>,
        default: () => [],
    },
});

const onDrop = (event: DragEvent, key?: string) => {
    debugger;
};
const startDrag = (event: DragEvent, id: number) => {
    // debugger;
};
const handleTouchMove = (event: TouchEvent) => {
    debugger;
};
const handleTouchEnd = (event: TouchEvent, id: number) => {
    debugger;
};
</script>

<style scoped lang="scss">
.container {
    min-width: 270px;
    padding: 20px;
    .body {
    }
}
</style>
