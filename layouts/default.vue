<template>
    <div class="flex flex-col h-screen w-full">
        <LayoutHeader />
        <div class="flex h-full">
            <LayoutSidebar />
            <div class="w-full overflow-hidden">
                <slot />
            </div>
        </div>
    </div>
</template>
