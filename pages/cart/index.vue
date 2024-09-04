<script setup lang="ts">
useSeoMeta({
    title: "Cart",
});

definePageMeta({
    layout: "commerce",
});

interface ICartItem {
    cart_qty: number;
    product_id: number;
    product_name: string;
    product_brand: string;
    product_price: number;
    product_img: string;
}

const carts = ref<Array<ICartItem>>([]);
const cartsSubTotal = computed(() => {
    return carts.value.reduce((total, obj) => {
        return total + obj.cart_qty * obj.product_price;
    }, 0);
});
const cartShipping = computed(() => {
    return cartsSubTotal.value > 0 ? 4 : 0;
});

const fetchProduct = async (product_ids: Array<number>) => {
    const query = buildQuery({
        product_ids: product_ids,
    });

    const { data } = await useFetch(`/api/product?${query}`);
    data.value?.data.forEach((o) => {
        const found_idx = carts.value.findIndex(
            (obj) => obj.product_id === o.id
        );

        if (found_idx > -1) {
            carts.value[found_idx] = {
                ...carts.value[found_idx],
                product_name: o.name,
                product_price: o.price,
                product_brand: o.brand,
                product_img: o.main_image,
            };
        }
    });
};

const loadLocalCart = () => {
    const cart_local = localStorage.getItem("cart");
    let cart_local_json: Array<Cart> = [];
    if (cart_local) {
        cart_local_json = JSON.parse(cart_local);
    }

    cart_local_json.forEach((o) => {
        const temp: ICartItem = {
            product_brand: "",
            product_name: "",
            product_id: o.product_id,
            cart_qty: o.qty,
            product_price: 0,
            product_img: "",
        };
        carts.value = [...carts.value, temp];
    });

    const product_ids = cart_local_json.map((o) => o.product_id);
    fetchProduct(product_ids);
};

const handleChangeQty = (product_id: number, qty: number) => {
    const foundIndex = carts.value.findIndex(
        (o) => o.product_id === product_id
    );
    if (foundIndex > -1) {
        carts.value[foundIndex].cart_qty = qty;
    }
    AddToCart(product_id, qty, "change");
};

const handleDeleteCartItem = (product_id: number) => {
    carts.value = carts.value.filter((o) => o.product_id !== product_id);
    DeleteFromCart(product_id);
};

// const calculateSubTotal = (c: Array<ICartItem>) => {
//     let total = 0
//     console.log(c)
//     const arr = deepClone(c)
//     console.log(arr)
//     c.map((obj) => {
//         console.log(obj)
//         total = total + (obj.cart_qty * obj.product_price)
//         console.log(obj.product_price)
//     })
//     cartsSubTotal.value = total
// }

// watch(carts, (newCarts, oldCarts) => {
//     console.log(newCarts)
//     calculateSubTotal(newCarts)
// })

nextTick(() => {
    loadLocalCart();
});
</script>

<template>
    <AtomsContainerDefault class="pb-20">
        <div class="max-w-screen-md border-b mb-12">
            <AtomsHeading class="mb-4">Shopping Continue</AtomsHeading>
        </div>
        <div class="mb-10">
            <AtomsHeading size="text-2xl">Shopping Chart</AtomsHeading>
            <p>
                You have {{ carts.length }}
                {{ carts.length > 1 ? " items" : " item" }} in your cart
            </p>
        </div>
        <div class="grid md:grid-cols-8 gap-4">
            <div class="flex flex-col md:col-span-5 space-y-4">
                <div
                    class="border border-white rounded-lg p-2"
                    v-for="(item, idx) in carts"
                    :key="idx"
                >
                    <div
                        class="flex md:flex-row flex-col gap-4 justify-between"
                    >
                        <div class="flex space-x-4 items-center max-w-sm">
                            <img
                                class="w-32 rounded-md"
                                :src="item.product_img"
                            />
                            <div>
                                <AtomsHeading size="text-lg">{{
                                    item.product_name
                                }}</AtomsHeading>
                                <p>{{ item.product_brand }}</p>
                            </div>
                        </div>
                        <div class="flex space-x-4 items-center justify-end">
                            <input
                                type="number"
                                :value="item.cart_qty"
                                class="bg-transparent text-xl w-12"
                                @input="(event: any) => handleChangeQty(item.product_id, event.target.value)"
                            />
                            <p>$ {{ item.product_price * item.cart_qty }}</p>
                            <div>
                                <button
                                    class="text-gray-500 hover:text-red-500"
                                    @click="
                                        () =>
                                            handleDeleteCartItem(
                                                item.product_id
                                            )
                                    "
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-trash"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                        />
                                        <path
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:col-span-3 border border-white rounded-lg py-3 px-4">
                <div class="flex items-center justify-between mb-5">
                    <AtomsHeading size="text-xl">Card Details</AtomsHeading>
                    <img
                        class="w-12 rounded-md"
                        src="https://picsum.photos/200/200"
                    />
                </div>
                <div class="mb-4">
                    <label>Card Type</label>
                </div>
                <div class="flex flex-col space-y-2">
                    <div class="flex flex-col">
                        <label for="name">Name on card</label>
                        <input
                            type="text"
                            placeholder="name"
                            class="border border-white p-2 rounded-md bg-transparent focus:outline-none focus:border-green-500"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label for="name">Card Number</label>
                        <input
                            type="text"
                            placeholder="111 22312 21312"
                            class="border border-white p-2 rounded-md bg-transparent focus:outline-none focus:border-green-500"
                        />
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div class="flex flex-col">
                            <label for="name">Expiration Date</label>
                            <input
                                type="text"
                                placeholder="mm/yy"
                                class="border border-white p-2 rounded-md bg-transparent focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div class="flex flex-col">
                            <label for="name">CVV</label>
                            <input
                                type="text"
                                placeholder="123"
                                class="border border-white p-2 rounded-md bg-transparent focus:outline-none focus:border-green-500"
                            />
                        </div>
                    </div>
                </div>
                <div class="py-5">
                    <hr />
                </div>
                <div class="flex flex-col gap-2 mb-10">
                    <div class="flex items-center justify-between">
                        <p>Subtotal</p>
                        <p>$ {{ cartsSubTotal }}</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <p>Shipping</p>
                        <p>$ {{ cartShipping }}</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <p>Total (Tax incl.)</p>
                        <p>$ {{ cartsSubTotal + cartShipping }}</p>
                    </div>
                </div>
                <div>
                    <button
                        class="bg-transparent border border-white border-2 flex justify-between items-center w-full rounded-lg p-3 hover:bg-gray-900"
                    >
                        <div>
                            <p>${{ cartsSubTotal + cartShipping }}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <p>Checkout</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-arrow-right"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </AtomsContainerDefault>
</template>
