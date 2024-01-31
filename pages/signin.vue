<template>
    <div class="flex h-full w-full">
        <FormsAuthForm isSignIn />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "auth",
});
</script>
