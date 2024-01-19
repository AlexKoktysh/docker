<template>
    <UForm :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Title" name="title">
            <UInput v-model="state.title" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
            <UInput v-model="state.description" type="description" />
        </UFormGroup>
        <UFormGroup label="Status" name="status">
            <UInput v-model="state.status" type="status" />
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

const state = reactive({
    title: "",
    description: "",
    status: props.status,
});

const onSubmit = async (event: any) => {
    toDoStore.createCard(event.data);
    emit("close");
};
</script>
