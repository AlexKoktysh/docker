<template>
    <div class="flex h-full overflow-auto">
        <DashboardColumnCard
            v-for="(el, key) in toDoStore.listItems"
            :key="el.name"
            :header="$t(el.name)"
            :items="el.items"
            :id="el.id"
            :status="key"
        />
    </div>
</template>

<script setup lang="ts">
import { useToDoListStore } from "../store/ToDoListStore";

const toDoStore = useToDoListStore();

onMounted(async () => await toDoStore.getCards());
</script>
