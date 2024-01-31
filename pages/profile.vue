<template>
    <div>
        {{ $t("Profile.title") }}
        <UButton @click="signOut" class="flex justify-center">Sign out</UButton>
    </div>
</template>

<script setup>
import { useUserStore } from "~/store/UserStore";

const userStore = useUserStore();

const signOut = async () => {
    await userStore.signOut();
};
</script>
