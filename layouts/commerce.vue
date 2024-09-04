<script setup lang="ts">
const logoText = ref("ASM Clinic");
const route = useRoute();
const menuItems = computed(() => {
    return [
        {
            label: "Product",
            to: "/product",
            active: route.path.includes("/product"),
        },
        {
            label: "Cart",
            to: "/cart",
            active: route.path.includes("/cart"),
        },
    ];
});
</script>

<template>
    <div class="bg-gray-950 text-white min-h-screen">
        <AtomsContainerDefault class="pt-8 mb-10">
            <div class="flex !justify-end w-full">
                <div class="flex items-center space-x-4">
                    <RouterLink
                        :to="item.to"
                        :class="[item.active ? 'font-black' : 'font-medium']"
                        class="text-xl hover:text-green-500"
                        v-for="(item, idx) in menuItems"
                        :key="idx"
                    >
                        {{ item.label }}
                    </RouterLink>
                </div>
            </div>
        </AtomsContainerDefault>
        <!-- <MainNavbar :logo-text="logoText" :menu-items="menuItems" /> -->
        <slot />
    </div>
</template>
