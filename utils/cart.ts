export interface Cart {
    product_id: number;
    qty: number;
}



export function AddToCart(product_id: number, qty: number, qty_type: string) {
    const cart_list = localStorage.getItem('cart')
    let cart_list_json: Array<Cart> = []
    if (cart_list) {
        cart_list_json = JSON.parse(cart_list || '')
    }

    const found_idx = cart_list_json.findIndex((o) => o.product_id === product_id)
    if (found_idx > -1) {
        if (qty_type === 'add') {
            cart_list_json[found_idx].qty += qty
        } else if (qty_type === 'sub') {
            cart_list_json[found_idx].qty -= qty
        } else {
            cart_list_json[found_idx].qty = qty
        }
    } else {
        const new_cart: Cart = {
            product_id: product_id,
            qty: qty
        }
        console.log(new_cart)
        cart_list_json = [...cart_list_json, new_cart]
    }

    localStorage.setItem('cart', JSON.stringify(cart_list_json))
    console.log(cart_list_json)
}

export const DeleteFromCart = (product_id: number) => {
    const cartList = localStorage.getItem('cart');
    let cartListJson: Cart[] = cartList ? JSON.parse(cartList) : [];
  
    cartListJson = cartListJson.filter((item) => item.product_id !== product_id);
  
    localStorage.setItem('cart', JSON.stringify(cartListJson));
}