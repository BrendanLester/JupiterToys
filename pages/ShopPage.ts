import { expect } from "@playwright/test";
import { page } from "./TestPage";

export const pageElements = {
}

export async function clickProductBuyButton(productName : string, numberOfclicks = 1){
    const buyButton = page.locator('li.product', { hasText: productName }).locator('a.btn', { hasText: 'Buy' });
    for(let num = 0; num < numberOfclicks;num++){
        await buyButton.click();
    }
}

