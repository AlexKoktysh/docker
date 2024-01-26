<template>
    <UForm :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Title" name="title">
            <UInput v-model="state.title" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
            <UInput v-model="state.description" type="description" />
        </UFormGroup>
        <UFormGroup label="Status" name="status">
            <USelectMenu v-model="state.status" :options="options" />
        </UFormGroup>
        <UButton type="submit"> Submit </UButton>
    </UForm>
</template>

<script setup lang="ts">
import { useToDoListStore } from "../../store/ToDoListStore";

const props = defineProps({
    status: {
        type: String,
    },
});
const emit = defineEmits(["close"]);

const toDoStore = useToDoListStore();

const options = [
    { label: "TO_DO", value: "TO_DO" },
    { label: "IN_PROGRESS", value: "IN_PROGRESS" },
    { label: "IN_TEST", value: "IN_TEST" },
    { label: "IN_COMPLETED", value: "IN_COMPLETED" },
];

const state = reactive({
    title: "",
    description: "",
    status: props.status,
});

const onSubmit = async (event: any) => {
    toDoStore.createCard({
        ...event.data,
        status: event.data.status.value ?? event.data.status,
    });
    emit("close");
};
</script>
