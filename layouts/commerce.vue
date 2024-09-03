<script setup lang="ts">
const logoText = ref("ASM Clinic");
const menuItems = ref([
    {
        label: "Product",
        to: "/product",
    },
    {
        label: "Cart",
        to: "/cart",
    },
]);
</script>

<template>
    <div class="bg-gray-950 text-white min-h-screen">
        <AtomsContainerDefault class="pt-8 mb-10">
            <div class="flex !justify-end w-full">
                <div class="flex items-center space-x-4">
                    <RouterLink
                        :to="item.to"
                        class="text-xl font-medium hover:text-green-500"
                        v-for="(item, idx) in menuItems"
                        :key="idx"
                    >
                        {{  item.label  }}
                    </RouterLink>
                </div>
            </div>
        </AtomsContainerDefault>
        <!-- <MainNavbar :logo-text="logoText" :menu-items="menuItems" /> -->
        <slot />
    </div>
</template>
