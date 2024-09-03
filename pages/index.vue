<script setup lang="ts">
useSeoMeta({
    title: "GeekHunter Hiring Assignment",
});

const menuList = [
    {
        label: "Product",
        to: "/product",
    },
    {
        label: "Cart",
        to: "/cart",
    },
];
</script>

<template>
    <AtomsContainerDefault :class="['py-20']">
        <AtomsHeading class="mb-5">Menu</AtomsHeading>
        <div class="flex flex-col space-y-2">
            <RouterLink :to="item.to" v-for="(item, idx) in menuList" :key="idx">
                <div class="bg-gray-600 hover:bg-gray-700 hover:border hover:border-gray-500 p-3 rounded-md">
                    {{ item.label }}
                </div>
            </RouterLink>
        </div>
    </AtomsContainerDefault>
</template>
