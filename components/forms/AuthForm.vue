<template>
    <UForm
        :validate="validate"
        :state="state"
        class="space-y-4 h-full w-full flex items-center justify-center flex-col"
        @submit="onSubmit"
    >
        <UFormGroup label="Email" name="email" class="w-1/3">
            <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password" class="w-1/3">
            <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <div class="flex justify-between flex-col h-20">
            <UButton class="flex justify-center" type="submit">{{
                isSignIn ? "Sign In" : "Sign Up"
            }}</UButton>
            <NuxtLink :to="`/${isSignIn ? 'signup' : 'signin'}`">{{
                isSignIn ? "Don't have an account?" : "Already have an account?"
            }}</NuxtLink>
        </div>
    </UForm>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

const props = defineProps({
    isSignIn: Boolean,
});

const state = reactive({
    email: undefined,
    password: undefined,
});
const route = useRoute();

const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.email) errors.push({ path: "email", message: "Required" });
    if (!state.password) errors.push({ path: "password", message: "Required" });
    return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
    console.log(event.data);
}
</script>
