<script setup lang="ts">
useSeoMeta({
    title: "Product Detail",
});

definePageMeta({
    layout: "commerce",
});

const route = useRoute();

interface IData {
    id?: number,
    slug?: string,
    brand?: string,
    main_image?: string,
    name?: string,
    review_count?: number,
    price?: number,
    discount?: number,
    is_prime?: boolean,
}

const data = ref<IData>({
    id: 0,
    slug: "",
    brand: "",
    main_image: "",
    name: "",
    review_count: 0,
    price: 0,
    discount: 0,
    is_prime: false,
});

const fetchData = async (id: number) => {
    const res = await useFetch(`/api/product/${id}`);
    console.log(id)
    console.log(res)
    data.value = {...res.data.value}
}

// watch(route, () => {
//     const { id } = route.params;
//     fetchData(Number(id))
// })

onMounted(() => {
    const { id } = route.params;
    fetchData(Number(id))
})

nextTick(() => {
    const { id } = route.params;
    fetchData(Number(id))
})

const handleAddToCart = (product_id: number) => {
    console.log(product_id)
    AddToCart(product_id, 1, 'add')
}

</script>

<template>
    <AtomsContainerDefault>
        <div class="max-w-screen-md border-b mb-12">
            <AtomsHeading class="mb-4">Product</AtomsHeading>
        </div>
        <div class="h-full bg-stone-700 px-4 py-3 rounded-3xl relative">
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
                    :src="typeof data === 'undefined' ? '' : data?.main_image"
                    :alt="typeof data === 'undefined' ? '' : data?.name"
                    class="mx-auto"
                />
            </div>
            <div class="mb-2">
                <h5 class="text-lg text-gray-200">
                    {{ typeof data === "undefined" ? "" : data?.brand }}
                </h5>
                <h5 class="text-xl font-bold">
                    {{ typeof data === "undefined" ? "" : data?.name }}
                </h5>
            </div>
            <div class="flex spave-x-2 items-center mb-2">
                <p class="text-md text-gray-200">
                    {{
                        typeof data === "undefined" ? "" : data?.review_count
                    }}
                    reviews
                </p>
            </div>
            <div class="flex space-x-2 items-center mb-5">
                <h5 class="font-medium text-black text-xl">
                    £{{ typeof data === "undefined" ? "" : data?.price }}
                </h5>
                <div
                    v-if="
                        typeof data === 'undefined'
                            ? ''
                            : data?.discount || 0 > 0
                    "
                    class="bg-red-200 text-red-600 rounded-full px-2 py-0 text-md"
                >
                    {{
                        typeof data === "undefined"
                            ? ""
                            : data?.discount || 0 * 100 + "%"
                    }}
                    OFF
                </div>
                <h5
                    class="text-blue-300 font-bold"
                    v-if="typeof data === 'undefined' ? '' : data?.is_prime"
                >
                    prime
                </h5>
            </div>
            <div>
                <button
                    class="bg-green-500 px-2 py-3 w-full rounded-full text-white hover:bg-green-700 font-bold text-lg"
                    @click="() => handleAddToCart(data.id || 0)"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    </AtomsContainerDefault>
</template>
