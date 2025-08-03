import { test, expect } from '@playwright/test';
import { CartPage, Navigation, ShopPage } from '../pages/SitePages';
import { setTestPage } from '../pages/TestPage';

const JUPITER_URL = 'https://jupiter.cloud.planittesting.com/'

test.describe('Jupiter Toys - Cart Tests', () => {
    
  test(`Test Case #3. Buy items and check cart`, async ({page}) => {    

    //Test data for buy quantities of items and their expected per item pricing.
    const TC3_DATA = [
      { 
        item: 'Stuffed Frog',
        toBuy: 2,
        price: 10.99
      },
      { 
        item: 'Fluffy Bunny',
        toBuy: 5,
        price: 9.99
      },
      { 
        item: 'Valentine Bear',
        toBuy: 3,
        price: 14.99
      }
    ]

    setTestPage(page)

    await test.step('Arrange - Navigate To Shop', async () => {  
      await page.goto(JUPITER_URL);
      await Navigation.clickShop();
    });


    //Do the necessary number of Buys, for each item in the test data.
    await test.step('Act - Buy Items', async () => {  
      let expectedCartQuantity = 0;
      for(let buyData of TC3_DATA){
        await ShopPage.clickProductBuyButton(buyData.item, buyData.toBuy)
        expectedCartQuantity += buyData.toBuy;
        await Navigation.verifyCartQuantity(expectedCartQuantity)
      }    
    });

    
    //Check the items bought came into the cart and their item prices & subtotals and the overall total is correct
    await test.step('Assert - Check Cart', async () => {  
      await Navigation.clickCart();

      const cartData = await CartPage.getCartData();  //Get the Cart table as an Object to ease of use
      console.log(JSON.stringify(cartData, null, 4));

      let expectedTotal = 0;
      for(let checkPrice of TC3_DATA){
        const expectedSubTotal = checkPrice.toBuy * checkPrice.price;        
        expectedTotal += expectedSubTotal;

        const itemInCart = CartPage.getCartItemByNameOrThrow(cartData, checkPrice.item);
        expect.soft(itemInCart.price).toBe(checkPrice.price);
        expect.soft(itemInCart.subtotal).toBe(expectedSubTotal);         
      }
      
      expect.soft(cartData.total).toBe(expectedTotal);    
    });

  });

});




