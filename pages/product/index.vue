<script setup lang="ts">
useSeoMeta({
    title: "Product",
});

definePageMeta({
    layout: "commerce",
});

const { data } = await useFetch("/api/product");

// const data = [
//     {
//         brand: "Apple",
//         main_image: 'https://picsum.photos/200/200',
//         name: "2021 Apple Macbook Pro (14 pouches, Puce Apple M1 Pro avec CPU 10 couer et GPU 16)",
//         review_count: 5000,
//         price: 999,
//         discount: 0.2,
//         is_prime: true,
//     },
//     {
//         brand: "Apple",
//         main_image: 'https://picsum.photos/200/200',
//         name: "2021 Apple Macbook Pro (14 pouches, Puce Apple M1 Pro avec CPU 10 couer et GPU 16)",
//         review_count: 5000,
//         price: 999,
//         discount: 0.2,
//         is_prime: true,
//     },
//     {
//         brand: "Apple",
//         main_image: 'https://picsum.photos/200/200',
//         name: "2021 Apple Macbook Pro (14 pouches, Puce Apple M1 Pro avec CPU 10 couer et GPU 16)",
//         review_count: 5000,
//         price: 999,
//         discount: 0.2,
//         is_prime: true,
//     },
// ];
</script>

<template>
    <AtomsContainerDefault>
        <div class="max-w-screen-md border-b mb-12">
            <AtomsHeading class="mb-4">Product</AtomsHeading>
        </div>
        <div class="grid md:grid-cols-3 gap-4">
            <div
                class="h-full bg-stone-700 px-4 py-3 rounded-3xl relative"
                v-for="(item, idx) in data?.data"
                :key="idx"
            >
                <div class="mb-5 flex space-x-2">
                    <div
                        class="p-2 rounded-b-full bg-yellow-600 text-white font-bold text-2xl -top-2 absolute pt-4"
                    >
                        01
                    </div>
                    <div class="pl-12 max-w-52">
                        <p class="text-yellow-600 leading-none">
                            1.4k purchased in the last 30 days
                        </p>
                    </div>
                </div>
                <div class="mb-5">
                    <img
                        :src="item.main_image"
                        :alt="item.name"
                        class="mx-auto"
                    />
                </div>
                <div class="mb-2 min-h-32">
                    <h5 class="text-lg text-gray-200">{{ item.brand }}</h5>
                    <h5 class="text-xl font-bold">
                        {{ item.name }}
                    </h5>
                </div>
                <div class="flex spave-x-2 items-center mb-2">
                    <p class="text-md text-gray-200">
                        {{ item.review_count }} reviews
                    </p>
                </div>
                <div class="flex space-x-2 items-center mb-20">
                    <h5 class="font-medium text-black text-xl">
                        £{{ item.price }}
                    </h5>
                    <div
                        v-if="item.discount > 0"
                        class="bg-red-200 text-red-600 rounded-full px-2 py-0 text-md"
                    >
                        {{ item.discount * 100 + "%" }} OFF
                    </div>
                    <h5 class="text-blue-300 font-bold" v-if="item.is_prime">
                        prime
                    </h5>
                </div>
                <div class="absolute bottom-3 left-0 w-full px-4">
                    <RouterLink :to="`/product/detail/${item.id}`">
                        <button
                            class="bg-green-500 py-3 w-full rounded-full text-white hover:bg-green-700 font-bold text-lg flex items-center space-x-2 justify-center"
                        >
                            <p>View Product</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-chevron-down text-yellow-300"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                                />
                            </svg>
                        </button>
                    </RouterLink>
                </div>
            </div>
        </div>
    </AtomsContainerDefault>
</template>
