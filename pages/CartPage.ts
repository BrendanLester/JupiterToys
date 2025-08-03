import { page } from "./TestPage";

export const pageElements = {
    cartTableRows: () => page.locator('table.cart-items tbody tr'),
    total: () => page.locator('.total')
}

type CartItem = {
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
};

type CartData = {
    items: CartItem[];
    total: number;    
};

//Parse the cart table into a list of item objects & the total so it's easier to work with
export async function getCartData(): Promise<CartData> {
    const items: CartItem[] = [];

    const rows = pageElements.cartTableRows();
    await rows.first().waitFor(); // wait until at least one row exists - getCartData expects a non-empty cart & sometimes the cart is slow to render

    const count = await rows.count();

    for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        items.push({
            name: (await row.locator('td').nth(0).innerText()).trim(),
            price:      parseFloat((await row.locator('td').nth(1).innerText()).replace('$', '')),
            quantity:   parseInt  ((await row.locator('td').nth(2).innerText()).trim(), 10),
            subtotal:   parseFloat((await row.locator('td').nth(3).innerText()).replace('$', ''))
        });
    }

    return {
        items,
        total: parseFloat((await pageElements.total().innerText()).replace('Total:', '').trim()),   //convert "Total: 54.95" to just "54.95"
    };
}

export function getCartItemByNameOrThrow(cart: CartData, name: string): CartItem {
    const item = cart.items.find(
        i => i.name.toLowerCase() === name.toLowerCase()
    );
    if (!item) {
        throw new Error(`Cart item "${name}" not found.`);
    }
    return item;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}