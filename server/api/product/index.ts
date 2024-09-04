export const Products = [
    {
        id: 1,
        slug: '2021-apple-macbook-pro',
        brand: "Apple",
        main_image: 'https://picsum.photos/200/200',
        name: "2021 Apple Macbook Pro (14 pouches, Puce Apple M1 Pro avec CPU 10 couer et GPU 16)",
        review_count: 5000,
        price: 999,
        discount: 0.2,
        is_prime: true,
    },
    {
        id: 2,
        slug: 'apple-ipad-air-6',
        brand: "Apple",
        main_image: 'https://picsum.photos/200/200',
        name: "Apple Ipad Air 6 (14 pouches, Puce Apple M1 Pro avec CPU 10 couer et GPU 16)",
        review_count: 5000,
        price: 999,
        discount: 0.2,
        is_prime: true,
    },
    {
        id: 3,
        slug: 'iphone-16-pro-max-256',
        brand: "Apple",
        main_image: 'https://picsum.photos/200/200',
        name: "Iphone 16 Pro Max 256 GB",
        review_count: 5000,
        price: 999,
        discount: 0.2,
        is_prime: true,
    },
];

export default defineEventHandler((event) => {
    const query = getQuery(event)
    let product_ids: Array<any> = []
    if (query.product_ids) {
        product_ids = String(query.product_ids).split(',').map((o) => Number(o))
    }

    console.log(query)

    if (product_ids.length > 0) {
        let arr = Products.filter((o) => product_ids.indexOf(o.id) !== -1)
        return {
            page: 1,
            count: arr.length,
            data: arr
        }
    }

    return {
      page: 1,
      count: Products.length,
      data: Products
    }
})