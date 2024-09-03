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
  }
]);
</script>

<template>
  <div class="bg-gray-950 text-white min-h-screen">
    <!-- <MainNavbar :logo-text="logoText" :menu-items="menuItems" /> -->
    <slot />
  </div>
</template>