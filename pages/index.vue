<template>
    <div class="flex h-full overflow-auto">
        <DashboardColumnCard
            v-for="el in toDoStore.items"
            :key="el.name"
            :header="$t(el.name)"
            :items="el.items"
            :id="el.id"
        />
    </div>
</template>

<script setup lang="ts">
import { useToDoListStore } from "../store/ToDoListStore";

const toDoStore = useToDoListStore();
</script>
