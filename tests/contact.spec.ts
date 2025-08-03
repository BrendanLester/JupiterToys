import { test } from '@playwright/test';
import { ContactPage, Navigation } from '../pages/SitePages';
import { setTestPage } from '../pages/TestPage';

const JUPITER_URL = 'https://jupiter.cloud.planittesting.com/'

test.describe('Jupiter Toys - Contact Tests', () => {
           
  test(`Test Case #1. Contact Form - Mandatory Messages`, async ({page}) => {    
    setTestPage(page)

    await test.step('Arrange - Navigate To Contact', async () => {  
      await page.goto(JUPITER_URL);
      await Navigation.clickContact();
    });

    await test.step('Act - Submit', async () => {  
      await ContactPage.clickSubmitButton();
    });

    await test.step('Assert - Check Required Messages appear', async () => {  
      await ContactPage.verifyFieldRequiredMessageVisible('Forename is required')
      await ContactPage.verifyFieldRequiredMessageVisible('Email is required')
      await ContactPage.verifyFieldRequiredMessageVisible('Message is required')
    });

    await test.step('Act - Enter Required Fields', async () => {  
      await ContactPage.enterForemame('a')
      await ContactPage.enterEmail('a@example.com')
      await ContactPage.enterMessage('lorem ipsum')
    });

    await test.step('Assert - Check Required Messages are gone', async () => {  
      await ContactPage.verifyFieldRequiredMessageHidden('Forename is required')
      await ContactPage.verifyFieldRequiredMessageHidden('Email is required')
      await ContactPage.verifyFieldRequiredMessageHidden('Message is required')
    });
  });



  const TESTCASE2_ITERATIONS = 5
  for(let x = 0;x < TESTCASE2_ITERATIONS;x++){  
    //Run iterations over test, rather than in the test, so tests can run in Parallel

    test(`Test Case #2. Contact Form - Submit. Run ${x+1}`, async ({page}) => {    
      setTestPage(page)
      const forename = 'Mary'

      await test.step('Arrange - Navigate To Contact', async () => {  
        await page.goto(JUPITER_URL);
        await Navigation.clickContact();
      });

      await test.step('Act - Enter Required Fields & Submit', async () => {  
        await ContactPage.enterForemame(forename)
        await ContactPage.enterEmail('a@example.com')
        await ContactPage.enterMessage('lorem ipsum')
        
        await ContactPage.clickSubmitButton();
      });

      await test.step('Assert - Submit was Successful', async () => {  
        await ContactPage.verifySubmitMessage(forename)
      })
      
    });
  }



});




