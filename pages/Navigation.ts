import { expect } from "@playwright/test";
import { page } from "./TestPage";

export const pageElements = {
    NavBar: () => page.locator('.navbar' ),
    Home: () => pageElements.NavBar().getByRole('link', { name: 'Home' }),
    Shop: () => pageElements.NavBar().getByRole('link', { name: 'Shop' }),
    Contact: () => pageElements.NavBar().getByRole('link', { name: 'Contact' }),
    Cart: () => pageElements.NavBar().getByRole('link', { name: 'Cart' }),

}

export async function clickContact(){
    await pageElements.Contact().click()
}

export async function clickShop(){
    await pageElements.Shop().click()
}

export async function clickCart(){
    await pageElements.Cart().click()
}

export async function verifyCartQuantity(expectedQuantity){
    expect(await pageElements.Cart().textContent()).toBe(`Cart (${expectedQuantity})`)
}