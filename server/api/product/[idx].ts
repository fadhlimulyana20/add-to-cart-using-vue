import { Products } from "."


export default defineEventHandler((event) => {
    const id = parseInt(event.context?.params?.idx || '') as number

    return Products.find((o) => o.id === Number(id))
})